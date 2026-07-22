@echo off
echo Activating virtual environment...
call .venv\Scripts\activate.bat
if errorlevel 1 (
    echo Error: Failed to activate virtual environment. Did you run setup_env.ps1?
    pause
    exit /b 1
)
echo Starting Backend with Uvicorn...
cd backend
uvicorn app:app --reload
pause
