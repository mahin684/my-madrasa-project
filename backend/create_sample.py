import pandas as pd

data = {
    "Student_Name": [
        "Ahmed Raza", "Ahmed Raza", "Ahmed Raza",
        "Fatima Begum", "Fatima Begum", "Fatima Begum",
        "Karim Uddin", "Karim Uddin", "Karim Uddin",
    ],
    "Roll": [1, 1, 1, 2, 2, 2, 3, 3, 3],
    "Class": ["10", "10", "10", "10", "10", "10", "10", "10", "10"],
    "Exam_Type": ["Yearly", "Yearly", "Yearly", "Yearly", "Yearly", "Yearly", "Yearly", "Yearly", "Yearly"],
    "Subject": ["Arabic", "Math", "English", "Arabic", "Math", "English", "Arabic", "Math", "English"],
    "Obtained_Marks": [80, 45, 70, 92, 88, 75, 30, 55, 40],
    "Full_Marks": [100, 100, 100, 100, 100, 100, 100, 100, 100],
}

df = pd.DataFrame(data)
df.to_excel("sample_upload.xlsx", index=False)
print("Created sample_upload.xlsx")
