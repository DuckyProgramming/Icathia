@echo off
cd C://users/ilis2/Desktop/Code/Icathia/Homepage
start "" /min cmd /c "http-server -c-1 --cors"
timeout /t 1 >nul
start "" "x64/RBTray.exe"
timeout /t 1 >nul
start "" "rb.ahk"