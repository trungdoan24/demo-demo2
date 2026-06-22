@echo off
cd /d C:\Users\ADMIN\Desktop\demo

echo ================================
echo DANG CAP NHAT DOCUMENTS.JSON
echo ================================

powershell -ExecutionPolicy Bypass -File .\update-docs.ps1

echo.
echo ================================
echo DANG THEM FILE VAO GIT
echo ================================

git add .

git diff --cached --quiet
if %errorlevel%==0 (
    echo Khong co thay doi moi de commit.
) else (
    git commit -m "Update documents"
)

echo.
echo ================================
echo DANG DAY LEN GITHUB
echo ================================

git push origin main

echo.
echo ================================
echo HOAN TAT
echo ================================

pause