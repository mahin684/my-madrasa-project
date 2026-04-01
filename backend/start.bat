@echo off
echo Starting Madrasa Result Management System...
"C:\Users\pc world\AppData\Local\Programs\Python\Python312\python.exe" -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
pause
