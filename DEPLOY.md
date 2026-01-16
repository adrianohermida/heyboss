# Guia de Deploy - GitHub Pages + Cloudflare Workers

## 📋 Requisitos

- Conta GitHub com repositório criado
- Conta Cloudflare com domínio
- Node.js 24+
- npm ou yarn

## 🚀 Passo 1: Preparar Repository GitHub

### 1.1 Criar repositório
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/heyboss.git
git push -u origin main
```

### 1.2 Habilitar GitHub Pages
1. Vá para repositório → Settings
2. Vá para Pages (esquerda)
3. Source: Deploy from a branch
4. Branch: main / Folder: /(root)
5. Save

## 🌐 Passo 2: Configurar Cloudflare Workers

### 2.1 Instalar Wrangler CLI
```bash
npm install -g @cloudflare/wrangler
```

### 2.2 Autenticar com Cloudflare
```bash
wrangler login
```

### 2.3 Criar banco de dados D1
```bash
wrangler d1 create heyboss_db
```

Isso retornará o `database_id`. Copie e atualize em `wrangler.json`:

```json
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "heyboss_db",
    "database_id": "SEU_ID_AQUI"
  }
]
```

### 2.4 Executar migrações
```bash
wrangler d1 execute heyboss_db --file ./src/shared/sql/202501142000-contact_submissions-data.sql
```

(Repita para todos os arquivos SQL em src/shared/sql/)

## 🔐 Passo 3: Configurar GitHub Secrets

No repositório GitHub → Settings → Secrets and variables → Actions

Adicione:
- `CLOUDFLARE_API_TOKEN`: Seu token da Cloudflare
- `CLOUDFLARE_ACCOUNT_ID`: ID da sua conta Cloudflare

### Como obter o token:
1. Cloudflare Dashboard → Conta → API Tokens
2. Create Token → Edit Cloudflare Workers
3. Copie o token

### Como obter o Account ID:
1. Cloudflare Dashboard → Página inicial
2. Copie o ID (canto direito)

## 📝 Passo 4: Configurar vite.config.ts

Atualize a configuração do Vite para build correto:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/client',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true
      }
    }
  }
})
```

## 🔧 Passo 5: Atualizar variáveis de ambiente

### Para Cloudflare Workers:
Atualize em `wrangler.json` as variáveis (você pode usar secrets):

```bash
wrangler secret put API_KEY --env production
wrangler secret put STRIPE_SECRET_KEY --env production
```

## 📦 Passo 6: Fazer Deploy

### Primeira vez (manual):
```bash
# Frontend
npm run build

# Backend
npm run deploy -- --env production
```

### Depois disso:
- Frontend: GitHub Actions (automático ao fazer push em main)
- Backend: GitHub Actions (automático ao fazer push em main)

## 🌍 Passo 7: Configurar domínio

### DNS do Cloudflare:
1. Vá para seu domínio no Cloudflare
2. DNS → Records
3. Adicione CNAME apontando para seu worker:
   - Name: `api`
   - Target: `heyboss-api.seu-usuario.workers.dev`

### GitHub Pages:
1. Repository Settings → Pages
2. Custom domain: `heyboss.com.br`
3. Cloudflare: Crie CNAME para GitHub Pages

## ✅ Checklist Final

- [ ] Repository criado e configurado no GitHub
- [ ] GitHub Pages habilitado
- [ ] Cloudflare D1 criado e migrado
- [ ] Secrets adicionados no GitHub
- [ ] wrangler.json atualizado com IDs reais
- [ ] vite.config.ts com outDir correto
- [ ] GitHub Actions workflows funcionando
- [ ] Domínio DNS apontando corretamente
- [ ] Frontend em https://seu-dominio.com.br
- [ ] Backend em https://api.seu-dominio.com.br

## 🔗 Links úteis

- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [GitHub Pages](https://pages.github.com/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [D1 Database](https://developers.cloudflare.com/d1/)

## 🆘 Troubleshooting

### GitHub Actions falhando?
- Verifique os Secrets estão configurados
- Veja logs em Actions → Seu workflow

### Worker não está respondendo?
- Verifique as variáveis em wrangler.json
- Teste localmente: `wrangler dev`

### Banco de dados não encontrado?
- Verifique se o database_id está correto
- Rode: `wrangler d1 list` para ver DBs disponíveis
