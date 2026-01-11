# Script to clean Next.js cache and restart dev server
Write-Host "Stopping dev server..." -ForegroundColor Yellow

# Remove .next directory
if (Test-Path ".next") {
    Write-Host "Removing .next directory..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force .next
}

Write-Host "Cache cleared!" -ForegroundColor Green
Write-Host ""
Write-Host "Now restart your dev server with: npm run dev" -ForegroundColor Cyan
