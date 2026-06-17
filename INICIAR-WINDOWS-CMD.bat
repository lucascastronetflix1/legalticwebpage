@echo off
TITLE Legal TIC Web App - Desarrollo local
cd /d "%~dp0"
echo.
echo ==============================================
echo   Legal TIC Web App - Instalacion y arranque
echo ==============================================
echo.
echo Ejecutando npm install...
npm.cmd install
if errorlevel 1 (
  echo.
  echo ERROR: npm install fallo.
  echo Si aparece "Exit handler never called", reinstala Node.js LTS o usa CMD limpio.
  pause
  exit /b 1
)
echo.
echo Ejecutando npm run dev...
npm.cmd run dev
pause
