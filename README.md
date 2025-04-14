# Central - Plataforma de Ensino de Programação

Uma plataforma interativa e gamificada para aprender programação de forma prática e divertida.

## 🚀 Funcionalidades Principais

### Aprendizado
- Cursos estruturados por níveis
  - HTML/CSS (Básico ao Avançado)
  - JavaScript (Fundamentos a Frameworks)
  - Python (Introdução a Data Science)
  - E mais linguagens em desenvolvimento

### Prática
- Editor de código integrado
- Exercícios práticos com correção automática
- Projetos guiados passo a passo
- Desafios semanais e mensais

### Gamificação
- Sistema de níveis e experiência
- Ranking global e por linguagem
- Conquistas e medalhas
- Batalhas de código (1v1)
- Ligações com outros estudantes

### Progresso
- Dashboard personalizado
- Índice de conhecimento detalhado
- Histórico de atividades
- Certificados de conclusão
- Relatórios de progresso

### Comunidade
- Fórum de discussão
- Compartilhamento de projetos
- Mentoria entre alunos
- Grupos de estudo
- Eventos online

## 🛠️ Tecnologias Utilizadas

### Frontend
- React.js com TypeScript
- Tailwind CSS para estilização
- Redux para gerenciamento de estado
- Monaco Editor para o editor de código
- Socket.io para interações em tempo real

### Backend
- Node.js com Express
- MongoDB para banco de dados
- Redis para cache e sessões
- JWT para autenticação
- WebSocket para comunicação em tempo real

### DevOps
- Docker para containerização
- GitHub Actions para CI/CD
- AWS para hospedagem
- Cloudflare para CDN
- Sentry para monitoramento

## 📋 Como Executar

### Pré-requisitos
- Node.js 18+
- MongoDB 6+
- Redis 7+
- Docker (opcional)

### Instalação
1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/codelearn.git
cd codelearn
```

2. Instale as dependências
```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Inicie os serviços
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
codelearn/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── services/        # Serviços e APIs
│   │   ├── store/           # Gerenciamento de estado
│   │   └── utils/           # Utilitários
│   └── public/              # Arquivos estáticos
├── server/                   # Backend Node.js
│   ├── src/
│   │   ├── controllers/     # Controladores
│   │   ├── models/         # Modelos do banco
│   │   ├── routes/         # Rotas da API
│   │   ├── services/       # Lógica de negócio
│   │   └── utils/          # Utilitários
│   └── config/             # Configurações
├── docs/                    # Documentação
└── tests/                  # Testes automatizados
```

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia nosso guia de contribuição e siga o código de conduta.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para suporte@codelearn.com ou abra uma issue no GitHub.
