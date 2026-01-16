# HeyBoss - Sistema de Gestão Jurídica

Um sistema completo de gestão jurídica construído com React, TypeScript, Tailwind CSS e Cloudflare Workers.

## 📋 Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + PostCSS
- **Build Tool**: Vite
- **Backend**: Hono (Cloudflare Workers)
- **Database**: Cloudflare D1 (SQLite)
- **Deployment**: Cloudflare Workers

## 🚀 Instalação Rápida

### Pré-requisitos

Você precisa ter instalado:
- **Node.js 18+** e npm (https://nodejs.org/)

### Passos de Instalação

1. **Clone ou entre no diretório do projeto**:
```bash
cd d:\Github\heyboss
```

2. **Se está no Windows, execute o script de setup**:
```bash
.\setup.bat
```

**OU** execute manualmente:
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**:
```bash
npm run dev
```

4. **Abra seu navegador** em:
```
http://localhost:5173
```

## 📦 Estrutura do Projeto

```
src/
├── react-app/              # Código React frontend
│   ├── components/         # Componentes reutilizáveis
│   ├── pages/             # Páginas da aplicação
│   ├── utils/             # Utilitários
│   ├── App.tsx            # Componente raiz
│   ├── main.tsx           # Ponto de entrada
│   └── index.css          # Estilos globais
├── worker/                # Código Hono (Backend)
└── shared/                # Código compartilhado
    ├── schemas/           # Schemas JSON dos modelos
    ├── sql/               # Migrations do banco de dados
    └── services/          # Serviços compartilhados
```

## 🛠️ Comandos Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Deploy para Cloudflare Workers
npm run deploy

# Preview da build
npm run preview
```

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_API_URL=http://localhost:8787
```

## 📱 Páginas Disponíveis

- `/` - Página inicial
- `/login` - Login
- `/blog` - Blog
- `/about` - Sobre
- `/contact` - Contato
- `/dashboard` - Dashboard (protegido)
- `/profile` - Perfil (protegido)

## ⚙️ Configuração

### Vite Config
Veja `vite.config.ts` para personalizar a configuração do build.

### TypeScript
Configuração em `tsconfig.app.json` para o app React.

### Tailwind CSS
Configuração em `tailwind.config.js` para tema e plugins customizados.

## 🐛 Troubleshooting

### npm: comando não reconhecido
- Instale Node.js de https://nodejs.org/
- Reinicie seu terminal/PowerShell
- Se ainda não funcionar, use `cmd.exe` em vez de PowerShell

### Erro "Cannot find module"
```bash
npm install
```

### Porta 5173 já em uso
```bash
npm run dev -- --port 3000
```

## 📞 Suporte

Para reportar problemas ou sugestões, abra uma issue no repositório.

## 📄 Licença

Copyright © 2026 HeyBoss. Todos os direitos reservados.
