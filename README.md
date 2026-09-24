# HelpDesk+ — Sistema de Chamados

Sistema full-stack responsivo para gestão de suporte técnico, com três personas: **Admin, Técnico e Cliente**.

## Stack
- Backend: Node.js + Express + TypeScript
- Banco: PostgreSQL
- ORM: Prisma
- Testes: Jest
- Auth: JWT + bcrypt
- Validação: Zod
- Frontend: React + Vite + TypeScript
- UI: TailwindCSS + Lucide
- Infra: Docker / Docker Compose
- Deploy sugerido: Backend Render + PostgreSQL; Frontend Vercel

## Funcionalidades
### Admin
- Criar/listar/editar técnicos; senha provisória e disponibilidade comercial padrão.
- Criar/listar/editar/desativar serviços com soft delete.
- Listar/excluir clientes; chamados do cliente são removidos por cascade.
- Visualizar chamados e alterar status.

### Técnico
- Editar próprio perfil e senha.
- Listar chamados atribuídos.
- Adicionar serviços ao chamado.
- Alterar status para Em atendimento e Encerrado.
- Upload de imagem de perfil via endpoint de upload.

### Cliente
- Criar conta e editar/excluir a própria conta.
- Criar chamado com serviço e técnico.
- Visualizar histórico.
- Não pode alterar chamados depois da criação.

## Dados iniciais
Após o seed:
- Admin: `admin@helpdesk.local` / `Admin@123`
- Técnicos: `tecnico1@helpdesk.local`, `tecnico2@helpdesk.local`, `tecnico3@helpdesk.local`
- Senha inicial dos técnicos: `Admin@123`
- Serviços: 9 serviços de exemplo.

## Rodar com Docker
```bash
docker compose up --build
```
Depois, dentro do backend, execute o seed uma vez:
```bash
docker compose exec backend npm run seed
```
Frontend:
```bash
cd frontend
npm install
npm run dev
```
Acesse `http://localhost:5173`.

## Rodar sem Docker
1. Crie um PostgreSQL e configure `backend/.env` usando `.env.example`.
2. No backend: `npm install`, `npx prisma migrate dev --name init`, `npm run seed`, `npm run dev`.
3. No frontend: `npm install`, copie `.env.example` para `.env` e execute `npm run dev`.

## Deploy
### Render
Crie um Web Service apontando para `backend`, build `npm install && npx prisma generate && npm run build`, start `npx prisma migrate deploy && npm start`. Configure `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL`.

### Vercel
Aponte para `frontend`, build `npm run build`, output `dist` e configure `VITE_API_URL` para a URL pública do backend.

## API principal
- `POST /api/auth/login`
- `GET /api/users/technicians`
- `POST /api/users/technicians`
- `GET /api/users/clients`
- `POST /api/users/clients`
- `PUT /api/users/me`
- `GET /api/services`
- `POST /api/services`
- `PUT /api/services/:id`
- `PATCH /api/services/:id/deactivate`
- `GET /api/tickets`
- `POST /api/tickets`
- `PATCH /api/tickets/:id/status`
- `POST /api/tickets/:id/services`
- `POST /api/uploads/profile`

## Observação sobre o Figma
O link do Figma informado não pôde ser lido neste ambiente. A aplicação foi estruturada com uma interface mobile-first, dashboard, navegação por persona e identidade visual roxa compatível com a proposta do desafio. Com as telas/exportações do Figma, o CSS pode ser refinado para reproduzir medidas e componentes pixel a pixel.
