# BrainGames

Aplicação educativa criada com React + Vite + Tailwind.

## Como usar localmente (VSCode)

1. Abra o VSCode e copie a pasta do projeto para sua máquina.
2. Abra o terminal na raiz do projeto e rode:

```bash
npm install
npm run dev
```

3. Acesse `http://localhost:5173`.

## Notas técnicas
- Projeto usa Tailwind v4 (config em `tailwind.config.cjs`).
- Estado de resultados é salvo em `localStorage` (chave `bg_results`).

## Responsividade
- Layout responsivo usando classes utilitárias do Tailwind (`grid`, `sm:`, `lg:` etc.).

## Deploy na Vercel
1. Crie um repositório (GitHub/GitLab/Bitbucket) e faça push do projeto.
2. Em Vercel, clique em "New Project" > import repository.
3. Vercel detecta Vite automaticamente. Use o comando de build:

```
npm run build
```

Diretório de saída: `dist` (padrão Vite).

## Dicas de produção
- Use Node versão LTS (recomenda-se >= 20).
- Atualize dependências periodicamente.
- Para backend ou APIs, crie um micro-serviço separado (Node/Express / Firebase Functions).

