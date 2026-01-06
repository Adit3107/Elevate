Get-ChildItem -Path 'src' -Include *.tsx,*.ts -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace "from '@/components", "from '@shared/components"
    $content = $content -replace "from '@/actions", "from '@shared/actions"
    $content = $content -replace "from '@/lib", "from '@shared/lib" 
    $content = $content -replace "from '@/schemas", "from '@shared/schemas"
    $content = $content -replace "from '@/hooks", "from '@shared/hooks"
    Set-Content -Path $_.FullName -Value $content -NoNewline
}
