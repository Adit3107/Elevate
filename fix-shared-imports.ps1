Get-ChildItem -Path 'shared' -Include *.tsx,*.ts -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # Replace @/ imports with relative paths based on file location
    # For files in shared/components/ui, use relative paths
    # For files in shared/actions, use relative paths
    
    # Components importing from hooks
    $content = $content -replace "from ['\`"]@/hooks/", "from '../../hooks/"
    
    # Components importing from other components
    $content = $content -replace "from ['\`"]@/components/ui/", "from './"
    $content = $content -replace "from ['\`"]@/components/", "from '../"
    
    # Actions importing from lib
    $content = $content -replace "from ['\`"]@/lib/", "from '../lib/"
    
    # Actions importing from schemas  
    $content = $content -replace "from ['\`"]@/schemas/", "from '../schemas/"
    
    Set-Content -Path $_.FullName -Value $content -NoNewline
}
