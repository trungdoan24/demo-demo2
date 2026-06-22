@echo off
cd /d C:\Users\ADMIN\Desktop\demo

echo ================================
echo DANG CAP NHAT DOCUMENTS.JSON
echo ================================

powershell -ExecutionPolicy Bypass -File .\update-docs.ps1

echo.
echo ================================
echo DANG KIEM TRA GIT
echo ================================

git add .

git commit -m "Update documents"

git push origin main

echo.
echo ================================
echo DA CAP NHAT XONG
echo ================================

pause