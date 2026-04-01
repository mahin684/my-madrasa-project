from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
import pandas as pd
import pytesseract
from PIL import Image
import io
import re
import tempfile
import os

from database import engine, get_db, Base
from models import Result
from schemas import (
    SingleResultCreate,
    MultiSubjectCreate,
    ResultResponse,
    MarksheetResponse,
    StudentRank,
)
from utils import (
    calculate_pass_marks,
    calculate_status,
    calculate_grade,
    get_average_grade,
    VALID_CLASSES,
    VALID_EXAM_TYPES,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Madrasa Result Management System",
    description="Result Management System for Mizmiji Painadi Fazil (Degree) Madrasah",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Health Check ────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {"message": "Madrasa Result Management System API", "status": "running"}


# ─── Single Result Entry ────────────────────────────────────────────────────
@app.post("/results/single", response_model=ResultResponse)
def create_single_result(data: SingleResultCreate, db: Session = Depends(get_db)):
    pass_marks = calculate_pass_marks(data.full_marks)
    status = calculate_status(data.obtained_marks, pass_marks)
    grade = calculate_grade(data.obtained_marks, data.full_marks)

    result = Result(
        student_name=data.student_name,
        roll=data.roll,
        class_name=data.class_name,
        exam_type=data.exam_type,
        subject=data.subject,
        obtained_marks=data.obtained_marks,
        full_marks=data.full_marks,
        pass_marks=pass_marks,
        status=status,
        grade=grade,
    )
    db.add(result)
    db.commit()
    db.refresh(result)
    return result


# ─── Multi-Subject Entry ─────────────────────────────────────────────────────
@app.post("/results/multi", response_model=dict)
def create_multi_subject_result(data: MultiSubjectCreate, db: Session = Depends(get_db)):
    created_results = []
    total_obtained = 0
    total_full = 0

    for subj in data.subjects:
        pass_marks = calculate_pass_marks(subj.full_marks)
        status = calculate_status(subj.obtained_marks, pass_marks)
        grade = calculate_grade(subj.obtained_marks, subj.full_marks)

        result = Result(
            student_name=data.student_name,
            roll=data.roll,
            class_name=data.class_name,
            exam_type=data.exam_type,
            subject=subj.subject,
            obtained_marks=subj.obtained_marks,
            full_marks=subj.full_marks,
            pass_marks=pass_marks,
            status=status,
            grade=grade,
        )
        db.add(result)
        total_obtained += subj.obtained_marks
        total_full += subj.full_marks
        created_results.append(result)

    db.commit()

    for r in created_results:
        db.refresh(r)

    percentage = round((total_obtained / total_full) * 100, 2) if total_full > 0 else 0
    avg_grade = get_average_grade(total_obtained, total_full)
    overall_status = "Pass" if all(r.status == "Pass" for r in created_results) else "Fail"

    return {
        "student_name": data.student_name,
        "roll": data.roll,
        "class_name": data.class_name,
        "exam_type": data.exam_type,
        "subjects": [ResultResponse.model_validate(r) for r in created_results],
        "total_obtained": total_obtained,
        "total_full": total_full,
        "percentage": percentage,
        "average_grade": avg_grade,
        "overall_status": overall_status,
    }


# ─── Excel Upload (Bulk Entry) ──────────────────────────────────────────────
@app.post("/results/upload-excel")
async def upload_excel(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith((".xlsx", ".xls")):
        raise HTTPException(status_code=400, detail="Only Excel files (.xlsx, .xls) are supported")

    contents = await file.read()
    df = pd.read_excel(io.BytesIO(contents))

    required_cols = {"Student_Name", "Roll", "Class", "Exam_Type", "Subject", "Obtained_Marks", "Full_Marks"}
    if not required_cols.issubset(set(df.columns)):
        missing = required_cols - set(df.columns)
        raise HTTPException(status_code=400, detail=f"Missing columns: {missing}")

    created = 0
    errors = []

    for idx, row in df.iterrows():
        try:
            full_marks = int(row["Full_Marks"])
            obtained = float(row["Obtained_Marks"])
            pass_marks = calculate_pass_marks(full_marks)
            status = calculate_status(obtained, pass_marks)
            grade = calculate_grade(obtained, full_marks)

            result = Result(
                student_name=str(row["Student_Name"]),
                roll=int(row["Roll"]),
                class_name=str(row["Class"]),
                exam_type=str(row["Exam_Type"]),
                subject=str(row["Subject"]),
                obtained_marks=obtained,
                full_marks=full_marks,
                pass_marks=pass_marks,
                status=status,
                grade=grade,
            )
            db.add(result)
            created += 1
        except Exception as e:
            errors.append({"row": idx + 2, "error": str(e)})

    db.commit()

    return {
        "message": f"Uploaded {created} results successfully",
        "created": created,
        "errors": errors,
    }


# ─── OCR Image Upload ────────────────────────────────────────────────────────
@app.post("/results/upload-image")
async def upload_image(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.lower().endswith((".png", ".jpg", ".jpeg", ".bmp", ".tiff")):
        raise HTTPException(status_code=400, detail="Only image files are supported")

    contents = await file.read()
    image = Image.open(io.BytesIO(contents))

    extracted_text = pytesseract.image_to_string(image)

    lines = extracted_text.strip().split("\n")
    parsed_results = []
    errors = []

    for i, line in enumerate(lines):
        line = line.strip()
        if not line:
            continue

        parts = re.split(r"\s{2,}|\t", line)
        parts = [p.strip() for p in parts if p.strip()]

        if len(parts) >= 4:
            try:
                roll = int(re.search(r"\d+", parts[0]).group()) if re.search(r"\d+", parts[0]) else None
                if roll is None:
                    continue

                subject = parts[1]
                obtained = float(parts[2])
                full_marks = int(parts[3]) if len(parts) > 3 else 100

                pass_marks = calculate_pass_marks(full_marks)
                status = calculate_status(obtained, pass_marks)
                grade = calculate_grade(obtained, full_marks)

                result = Result(
                    student_name="OCR Extracted",
                    roll=roll,
                    class_name="Unknown",
                    exam_type="Unknown",
                    subject=subject,
                    obtained_marks=obtained,
                    full_marks=full_marks,
                    pass_marks=pass_marks,
                    status=status,
                    grade=grade,
                )
                db.add(result)
                parsed_results.append({
                    "roll": roll,
                    "subject": subject,
                    "obtained_marks": obtained,
                    "full_marks": full_marks,
                    "status": status,
                    "grade": grade,
                })
            except Exception as e:
                errors.append({"line": i + 1, "text": line, "error": str(e)})

    db.commit()

    return {
        "message": f"Extracted {len(parsed_results)} results from image",
        "extracted_text": extracted_text,
        "parsed_results": parsed_results,
        "errors": errors,
    }


# ─── Search Marksheet (Class + Roll) ────────────────────────────────────────
@app.get("/results/marksheet", response_model=MarksheetResponse)
def get_marksheet(
    class_name: str = Query(..., description="Class name (e.g., 10, Fazil 1st)"),
    roll: int = Query(..., description="Student roll number"),
    exam_type: str = Query(None, description="Exam type filter"),
    db: Session = Depends(get_db),
):
    query = db.query(Result).filter(Result.class_name == class_name, Result.roll == roll)
    if exam_type:
        query = query.filter(Result.exam_type == exam_type)

    results = query.all()

    if not results:
        raise HTTPException(status_code=404, detail="No results found for the given class and roll")

    student_name = results[0].student_name
    exam = results[0].exam_type

    total_obtained = sum(r.obtained_marks for r in results)
    total_full = sum(r.full_marks for r in results)
    percentage = round((total_obtained / total_full) * 100, 2) if total_full > 0 else 0
    avg_grade = get_average_grade(total_obtained, total_full)
    overall_status = "Pass" if all(r.status == "Pass" for r in results) else "Fail"

    return MarksheetResponse(
        student_name=student_name,
        roll=roll,
        class_name=class_name,
        exam_type=exam,
        subjects=[ResultResponse.model_validate(r) for r in results],
        total_obtained=total_obtained,
        total_full=total_full,
        percentage=percentage,
        average_grade=avg_grade,
        overall_status=overall_status,
    )


# ─── Ranking ─────────────────────────────────────────────────────────────────
@app.get("/results/ranking", response_model=list[StudentRank])
def get_ranking(
    class_name: str = Query(..., description="Class name"),
    exam_type: str = Query(None, description="Exam type filter"),
    db: Session = Depends(get_db),
):
    query = db.query(
        Result.student_name,
        Result.roll,
        func.sum(Result.obtained_marks).label("total_obtained"),
        func.sum(Result.full_marks).label("total_full"),
    ).filter(Result.class_name == class_name)

    if exam_type:
        query = query.filter(Result.exam_type == exam_type)

    query = query.group_by(Result.roll, Result.student_name)
    query = query.order_by(func.sum(Result.obtained_marks).desc())

    rows = query.all()

    if not rows:
        raise HTTPException(status_code=404, detail="No results found for the given class")

    ranking = []
    for idx, row in enumerate(rows):
        percentage = round((row.total_obtained / row.total_full) * 100, 2) if row.total_full > 0 else 0
        avg_grade = get_average_grade(row.total_obtained, row.total_full)
        ranking.append(
            StudentRank(
                rank=idx + 1,
                student_name=row.student_name,
                roll=row.roll,
                total_obtained=row.total_obtained,
                total_full=row.total_full,
                percentage=percentage,
                average_grade=avg_grade,
            )
        )

    return ranking


# ─── List All Results ────────────────────────────────────────────────────────
@app.get("/results/all", response_model=list[ResultResponse])
def get_all_results(
    class_name: str = Query(None),
    exam_type: str = Query(None),
    roll: int = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Result)
    if class_name:
        query = query.filter(Result.class_name == class_name)
    if exam_type:
        query = query.filter(Result.exam_type == exam_type)
    if roll:
        query = query.filter(Result.roll == roll)
    return query.all()


# ─── Delete Result ───────────────────────────────────────────────────────────
@app.delete("/results/{result_id}")
def delete_result(result_id: int, db: Session = Depends(get_db)):
    result = db.query(Result).filter(Result.id == result_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Result not found")
    db.delete(result)
    db.commit()
    return {"message": f"Result {result_id} deleted successfully"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
