@echo off
REM Script de setup do projeto HeyBoss

echo 🚀 Iniciando setup do projeto HeyBoss...

REM Verificar se Node.js está instalado
where /q node
if %ERRORLEVEL% neq 0 (
    echo ❌ Node.js não encontrado.
    echo 📥 Por favor, instale Node.js LTS de https://nodejs.org/
    echo    Depois execute este script novamente
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js encontrado: %NODE_VERSION%
echo ✅ npm encontrado: %NPM_VERSION%

REM Limpar cache
echo 🧹 Limpando cache npm...
call npm cache clean --force

REM Instalar dependências
echo 📦 Instalando dependências...
call npm install

if %ERRORLEVEL% equ 0 (
    echo ✅ Instalação concluída com sucesso!
    echo.
    echo 🎉 Seu projeto está pronto!
    echo.
    echo Comandos disponíveis:
    echo   npm run dev    - Iniciar servidor de desenvolvimento
    echo   npm run build  - Build para produção
    echo   npm run deploy - Deploy para Cloudflare
) else (
    echo ❌ Erro na instalação
    pause
    exit /b 1
)
