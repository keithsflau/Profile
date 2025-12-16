@echo off
echo Installing Dependencies...
cd /d "%~dp0"
if not exist venv (
    echo Creating Python 3.11 virtual environment...
    py -3.11 -m venv venv
)
call venv\Scripts\activate
echo Installing libraries (this may take a few minutes)...
pip install -r requirements.txt
echo Done!
pause
