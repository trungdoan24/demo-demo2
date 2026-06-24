@echo off
title CAP NHAT THU VIEN PDF TRUNG DOAN 24

echo ========================================
echo 1. DONG BO PDF LEN CLOUDFLARE R2
echo ========================================

C:\rclone\rclone.exe sync ^
"C:\Users\ADMIN\Desktop\demo\sohoa" ^
r2:trungdoan24/sohoa ^
-P

echo.
echo ========================================
echo 2. CAP NHAT documents.json
echo ========================================

powershell -ExecutionPolicy Bypass -File "C:\Users\ADMIN\Desktop\demo\update-docs.ps1"

echo.
echo ========================================
echo 3. KIEM TRA THAY DOI
echo ========================================

cd /d C:\Users\ADMIN\Desktop\demo

git add .

git diff --cached --quiet

if %errorlevel%==0 (
    echo.
    echo KHONG CO THAY DOI MOI
    goto END
)

echo.
echo ========================================
echo 4. GIT COMMIT
echo ========================================

git commit -m "Auto update documents"

echo.
echo ========================================
echo 5. GIT PUSH
echo ========================================

git push origin main

:END

echo.
echo ========================================
echo HOAN TAT
echo ========================================

pause