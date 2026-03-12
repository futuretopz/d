# ZIG Music 🎵

O primeiro app 100% grátis para ouvir músicas em tempo real com seus amigos. Sem limites, sem anúncios.

## 🚀 Tecnologias

- **Next.js 16** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Supabase** - Banco de dados e autenticação
- **Resend** - Serviço de email
- **Lavalink** - Streaming de música
- **iTunes API** - Metadados de músicas

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou pnpm
- Conta Supabase
- Conta Resend
- Servidor Lavalink

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/zig-music.git
cd zig-music
```

2. Instale as dependências:
```bash
npm install
# ou
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais.

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 🗄️ Configuração do Banco de Dados

Execute o SQL em `supabase-verification-table.sql` no seu projeto Supabase para criar as tabelas necessárias.

## 🌐 Deploy na Railway

1. Crie uma conta em [Railway](https://railway.app)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente no painel da Railway
4. Deploy automático será feito a cada push

### Variáveis de Ambiente Necessárias:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `LAVALINK_HOST`
- `LAVALINK_PORT`
- `LAVALINK_PASSWORD`
- `JWT_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_APP_URL`

## 📝 Funcionalidades

- ✅ Autenticação com verificação por email
- ✅ Player de música com controles completos
- ✅ Criar e gerenciar playlists
- ✅ Favoritar músicas
- ✅ Busca de músicas
- ✅ Descobrir novas músicas
- ✅ Perfil de usuário
- ✅ Configurações de conta

## 📄 Licença

Este projeto é privado e proprietário.

## 👥 Contato

Para dúvidas ou suporte, entre em contato através do email: suporte@zigmusic.com
