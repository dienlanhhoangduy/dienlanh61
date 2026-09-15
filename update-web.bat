@echo off
chcp 65001 > nul
echo ===================================================
echo   ĐANG TỰ ĐỘNG CẬP NHẬT WEBSITE LÊN GITHUB PAGES...
echo   Repo: https://github.com/dienlanhhoangduy/dienlanh61
echo   URL: https://dienlanhhoangduy.github.io/dienlanh61/
echo ===================================================
echo.

git status > nul 2>&1
if %errorlevel% neq 0 (
    echo [1/4] Khoi tao Git repository...
    git init
    git branch -M main
    git remote add origin https://github.com/dienlanhhoangduy/dienlanh61.git
)

echo [2/4] Dang gom toan bo file vua cap nhat...
git add .

echo [3/4] Dang tao Commit...
git commit -m "Cap nhat website Dien Lanh 24H moi nhat"

echo [4/4] Dang day len GitHub (Push)...
git push -u origin main --force

echo.
echo ===================================================
echo   HOÀN TẤT!
echo   Website se tu dong cap nhat online sau 30 giay tai:
echo   https://dienlanhhoangduy.github.io/dienlanh61/
echo ===================================================
pause
