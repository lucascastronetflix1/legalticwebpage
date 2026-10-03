@echo off
TITLE Verificar archivos Legal TIC
cd /d "%~dp0"
echo Carpeta actual:
echo %CD%
echo.
echo Archivos principales esperados:
dir package.json
dir SUBIR-A-SUPABASE.sql
dir .env.example
dir src\App.jsx
echo.
pause
