from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from database import Base


class Result(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    student_name = Column(String, nullable=False)
    roll = Column(Integer, nullable=False)
    class_name = Column(String, nullable=False)
    exam_type = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    obtained_marks = Column(Float, nullable=False)
    full_marks = Column(Integer, nullable=False)
    pass_marks = Column(Float, nullable=False)
    status = Column(String, nullable=False)
    grade = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
