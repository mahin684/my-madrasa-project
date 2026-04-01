from pydantic import BaseModel
from typing import Optional


class SubjectMark(BaseModel):
    subject: str
    obtained_marks: float
    full_marks: int = 100


class SingleResultCreate(BaseModel):
    student_name: str
    roll: int
    class_name: str
    exam_type: str
    subject: str
    obtained_marks: float
    full_marks: int = 100


class MultiSubjectCreate(BaseModel):
    student_name: str
    roll: int
    class_name: str
    exam_type: str
    subjects: list[SubjectMark]


class ResultResponse(BaseModel):
    id: int
    student_name: str
    roll: int
    class_name: str
    exam_type: str
    subject: str
    obtained_marks: float
    full_marks: int
    pass_marks: float
    status: str
    grade: str

    class Config:
        from_attributes = True


class MarksheetResponse(BaseModel):
    student_name: str
    roll: int
    class_name: str
    exam_type: str
    subjects: list[ResultResponse]
    total_obtained: float
    total_full: float
    percentage: float
    average_grade: str
    overall_status: str


class StudentRank(BaseModel):
    rank: int
    student_name: str
    roll: int
    total_obtained: float
    total_full: float
    percentage: float
    average_grade: str
