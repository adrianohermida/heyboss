#!/bin/bash

# Script de setup do projeto HeyBoss
echo "🚀 Iniciando setup do projeto HeyBoss..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado."
    echo "📥 Por favor, instale Node.js LTS de https://nodejs.org/"
    echo "   Depois execute npm install novamente"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo "✅ npm encontrado: $(npm --version)"

# Limpar cache
echo "🧹 Limpando cache npm..."
npm cache clean --force

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Instalação concluída com sucesso!"
    echo ""
    echo "🎉 Seu projeto está pronto!"
    echo ""
    echo "Comandos disponíveis:"
    echo "  npm run dev    - Iniciar servidor de desenvolvimento"
    echo "  npm run build  - Build para produção"
    echo "  npm run deploy - Deploy para Cloudflare"
else
    echo "❌ Erro na instalação"
    exit 1
fi
