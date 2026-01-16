# Script PowerShell para listar todas as tabelas do banco D1 remoto

# Lista todas as tabelas
wrangler d1 execute heyboss_db --remote --command ".tables"

# Para cada tabela, mostra as 3 primeiras linhas (ajuste conforme necessário)
$tabelas = wrangler d1 execute heyboss_db --remote --command ".tables" | Select-String -Pattern "\w+" | ForEach-Object { $_.ToString().Trim() }

foreach ($tabela in $tabelas) {
    Write-Host "\nTabela: $tabela"
    wrangler d1 execute heyboss_db --remote --command "SELECT * FROM $tabela LIMIT 3;"
}
