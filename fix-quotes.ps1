Get-ChildItem -Path 'shared' -Include *.tsx,*.ts -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # Fix mismatched quotes - replace '../lib/utils" with '../../lib/utils'
    $content = $content -replace "from '../lib/utils`"", "from '../../lib/utils'"
    $content = $content -replace "from './([^'`"]+)`"", "from './$1'"
    $content = $content -replace "} from './([^'`"]+)`"", "} from './$1'"
    $content = $content -replace "} from '../([^'`"]+)`"", "} from '../$1'"
    $content = $content -replace "from '../../hooks/([^'`"]+)`"", "from '../../hooks/$1'"
    
    Set-Content -Path $_.FullName -Value $content -NoNewline
}
