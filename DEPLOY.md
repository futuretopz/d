# 📦 Guia de Deploy - ZIG Music

## 1️⃣ Preparar o Projeto para GitHub

### Inicializar Git (se ainda não foi feito)
```bash
git init
```

### Adicionar todos os arquivos
```bash
git add .
```

### Fazer o primeiro commit
```bash
git commit -m "Initial commit - ZIG Music"
```

### Criar repositório no GitHub
1. Acesse https://github.com/new
2. Nome do repositório: `zig-music` (ou o nome que preferir)
3. Deixe como **Private** (recomendado)
4. NÃO marque "Initialize with README" (já temos um)
5. Clique em "Create repository"

### Conectar ao GitHub
```bash
git remote add origin https://github.com/SEU-USUARIO/zig-music.git
git branch -M main
git push -u origin main
```

Substitua `SEU-USUARIO` pelo seu username do GitHub.

---

## 2️⃣ Deploy na Railway

### Opção A: Deploy via GitHub (Recomendado)

1. Acesse https://railway.app
2. Faça login com GitHub
3. Clique em "New Project"
4. Selecione "Deploy from GitHub repo"
5. Escolha o repositório `zig-music`
6. Railway detectará automaticamente que é Next.js

### Configurar Variáveis de Ambiente na Railway

No painel do projeto, vá em **Variables** e adicione:

```
SPOTIFY_CLIENT_ID=b889dfa5bf974bcc8a97dcca897848cd
SPOTIFY_CLIENT_SECRET=eed8cdb47355431eb6132d1ad6ef4718
LAVALINK_HOST=179.0.125.138
LAVALINK_PORT=2333
LAVALINK_PASSWORD=youshallnotpass
LAVALINK_SECURE=false
JWT_SECRET=dg983ybg3iugk3gfvh9ff3ekrhfi39gewhklrv3er9vh3rkgwgvw09ve3rksvgb09v3eghwf
NEXT_PUBLIC_SUPABASE_URL=https://rmwmqpqqilmnwshdvlpj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtd21xcHFxaWxtbndzaGR2bHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNDc1NTQsImV4cCI6MjA4ODkyMzU1NH0.CNijDilDzoCVgvzPJdt-8JhUnkiAhBEyvwzIOuNRZzA
RESEND_API_KEY=re_KtKYZXsG_E1Vcm36TVRs9noYc2E2woTTf
```

⚠️ **IMPORTANTE**: Após o deploy, adicione também:
```
NEXT_PUBLIC_APP_URL=https://seu-app.railway.app
```

### Opção B: Deploy via CLI

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Inicializar projeto
railway init

# Deploy
railway up
```

---

## 3️⃣ Configurações Pós-Deploy

### Atualizar URL no Resend
1. Acesse https://resend.com/domains
2. Configure o domínio `zigmusic.com` para apontar para o Railway
3. Ou use o domínio fornecido pelo Railway

### Atualizar Supabase
1. No Supabase, vá em **Authentication** → **URL Configuration**
2. Adicione a URL do Railway em **Site URL**
3. Adicione em **Redirect URLs**: `https://seu-app.railway.app/**`

### Testar o Deploy
1. Acesse a URL fornecida pela Railway
2. Teste o registro de usuário
3. Verifique se o email de verificação chega
4. Teste o player de música

---

## 4️⃣ Atualizações Futuras

Sempre que fizer mudanças no código:

```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

A Railway fará o deploy automático! 🚀

---

## 🆘 Troubleshooting

### Erro de Build
- Verifique se todas as variáveis de ambiente estão configuradas
- Veja os logs no painel da Railway

### Emails não chegam
- Verifique se o domínio está verificado no Resend
- Confirme que `NEXT_PUBLIC_APP_URL` está correto

### Músicas não tocam
- Verifique se o servidor Lavalink está acessível
- Teste a conexão com `LAVALINK_HOST`

### Erro de autenticação
- Confirme que as credenciais do Supabase estão corretas
- Verifique se a tabela `verification_codes` foi criada
