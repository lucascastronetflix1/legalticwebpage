@echo off
title Legal TIC Web App - iniciar
cd /d "%~dp0"
echo =============================================
echo Legal TIC Web App - limpieza e inicio
echo =============================================
echo.
echo Configurando npm para usar el registro publico...
npm.cmd config set registry https://registry.npmjs.org/
echo.
echo Instalando dependencias...
npm.cmd install --registry https://registry.npmjs.org/ --no-audit --no-fund
if errorlevel 1 (
  echo.
  echo La instalacion fallo. Cierre VS Code/Chrome, borre node_modules y vuelva a ejecutar este archivo.
  pause
  exit /b 1
)
echo.
echo Iniciando la aplicacion...
npm.cmd run dev
pause
