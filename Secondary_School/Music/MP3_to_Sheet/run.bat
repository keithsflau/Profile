@echo off
echo Starting Soniq App...
cd /d "%~dp0"
call venv\Scripts\activate
python app.py
pause
