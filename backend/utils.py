def calculate_pass_marks(full_marks: int) -> float:
    return round(full_marks * 0.33, 2)


def calculate_status(obtained_marks: float, pass_marks: float) -> str:
    return "Pass" if obtained_marks >= pass_marks else "Fail"


def calculate_grade(obtained_marks: float, full_marks: float) -> str:
    if full_marks == 0:
        return "F"
    percentage = (obtained_marks / full_marks) * 100
    if percentage >= 80:
        return "A+"
    elif percentage >= 70:
        return "A"
    elif percentage >= 60:
        return "A-"
    elif percentage >= 50:
        return "B"
    elif percentage >= 40:
        return "C"
    elif percentage >= 33:
        return "D"
    else:
        return "F"


def get_average_grade(total_obtained: float, total_full: float) -> str:
    return calculate_grade(total_obtained, total_full)


VALID_CLASSES = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "Alim 1st", "Alim 2nd", "Fazil 1st", "Fazil 2nd"
]

VALID_EXAM_TYPES = ["Tutorial", "Half-Yearly", "Yearly"]
