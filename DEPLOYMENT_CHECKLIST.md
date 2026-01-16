# Checklist Deploy - GitHub Pages + Cloudflare Workers

## ✅ O que foi configurado

### GitHub Actions Workflows
- [x] `.github/workflows/deploy.yml` - Deploy automático do Frontend para GitHub Pages
- [x] `.github/workflows/deploy-worker.yml` - Deploy automático do Backend para Cloudflare Workers

### Configurações
- [x] `wrangler.json` - Atualizado com estrutura de ambientes (dev, staging, production)
- [x] `.gitignore` - Configurado para ignorar arquivos sensíveis
- [x] `DEPLOY.md` - Guia completo de deployment

## 🚀 Próximos Passos

### 1️⃣ Prepare o GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/heyboss.git
git push -u origin main
```

### 2️⃣ Habilite GitHub Pages
- Vá para seu repositório → Settings → Pages
- Source: Deploy from a branch
- Branch: main

### 3️⃣ Configure Cloudflare
```bash
npm install -g @cloudflare/wrangler
wrangler login
wrangler d1 create heyboss_db
```

Copie o `database_id` retornado e atualize em `wrangler.json`

### 4️⃣ Adicione Secrets no GitHub
- Settings → Secrets and variables → Actions
- `CLOUDFLARE_API_TOKEN` - Token da Cloudflare
- `CLOUDFLARE_ACCOUNT_ID` - ID da sua conta

### 5️⃣ Primeiro Deploy Manual
```bash
npm run build
npm run deploy -- --env production
```

## 📍 Arquitetura Final

```
┌─────────────────────────────────────┐
│   GitHub Repository (seu-usuario)   │
│   ├── Frontend (src/react-app)      │
│   └── Backend (src/worker)          │
└──────────┬──────────────────────────┘
           │
    ┌──────┴───────┐
    │              │
    ▼              ▼
GitHub Pages   Cloudflare Workers
seu-dominio    api.seu-dominio
    com.br         com.br
```

## 🔗 DNS Configuration Example

```
seu-dominio.com.br
├── @ (root) → GitHub Pages
└── api → Cloudflare Worker
```

## 📋 Variáveis de Ambiente Necessárias

Em `wrangler.json`, atualize com seus valores reais:

- `PROJECT_ID` - ID do projeto
- `USER_EMAIL` - Email do proprietário
- `API_KEY` - Chave da API
- `ADMIN_EMAILS` - Emails dos administradores
- `STRIPE_SECRET_KEY` - Chave do Stripe (production)
- `DATABASE_ID` - ID do Cloudflare D1

## 🎯 Resultado Esperado

✅ Frontend em `https://seu-dominio.com.br`
✅ Backend em `https://api.seu-dominio.com.br`
✅ Deploy automático ao fazer push em main
✅ Banco de dados D1 em Cloudflare

---

Veja o arquivo `DEPLOY.md` para instruções detalhadas!
