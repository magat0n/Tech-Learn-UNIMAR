# TechLearn - Plataforma de Ensino de Programação

Uma plataforma interativa e gamificada para aprender programação de forma prática e divertida, desenvolvida com tecnologias modernas e foco na experiência do usuário.

## 🚀 Funcionalidades Principais

### 📚 Aprendizado Interativo
- **Cursos Estruturados**: HTML/CSS, JavaScript, Python e mais linguagens
- **Editor de Código Integrado**: Execute código diretamente na plataforma
- **Exercícios Práticos**: Com correção automática e feedback instantâneo
- **Projetos Guiados**: Aprenda construindo projetos reais

### 🎮 Gamificação
- **Sistema de Níveis**: Ganhe XP completando atividades
- **Ranking Global**: Compete com outros estudantes
- **Conquistas**: Desbloqueie medalhas e badges
- **Desafios Semanais**: Teste suas habilidades

### 👥 Comunidade
- **Chat de Suporte**: Suporte 24/7 via chat integrado
- **Fórum de Discussão**: Tire dúvidas com a comunidade
- **Compartilhamento**: Compartilhe seus projetos

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design responsivo com variáveis CSS e animações
- **JavaScript (ES6+)**: Funcionalidades interativas e modulares
- **Google Fonts**: Tipografia moderna (Poppins)

### Backend
- **Python 3.8+**: Linguagem principal
- **Flask**: Framework web leve e flexível
- **SQLAlchemy**: ORM para banco de dados
- **PostgreSQL/SQLite**: Banco de dados
- **JWT**: Autenticação segura
- **CORS**: Cross-origin resource sharing

### DevOps
- **Heroku**: Deploy automático
- **GitHub**: Controle de versão
- **Environment Variables**: Configuração segura

## 📋 Pré-requisitos

- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)
- Git
- Navegador web moderno

## 🚀 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/TechLearn.git
cd TechLearn
```

### 2. Configure o ambiente virtual
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Instale as dependências
```bash
cd back_end
pip install -r requirements.txt
```

### 4. Configure as variáveis de ambiente
Crie um arquivo `.env` na pasta `back_end`:
```env
SECRET_KEY=sua_chave_secreta_aqui
DATABASE_URL=sqlite:///techlearn.db
FLASK_ENV=development
```

### 5. Inicialize o banco de dados
```bash
python app.py
```

### 6. Execute o projeto
```bash
# Backend (pasta back_end)
python app.py

# Frontend (pasta raiz)
# Abra o arquivo index.html no navegador
# Ou use um servidor local:
python -m http.server 8000
```

## 🌐 Deploy

### Deploy no Heroku
1. Crie uma conta no [Heroku](https://heroku.com)
2. Instale o [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
3. Execute os comandos:
```bash
heroku create techlearn-app
git add .
git commit -m "Deploy inicial"
git push heroku main
```

### Deploy no Vercel (Frontend)
1. Conecte seu repositório ao [Vercel](https://vercel.com)
2. Configure o build:
   - Build Command: `echo "Build completo"`
   - Output Directory: `.`
   - Install Command: `echo "Sem instalação necessária"`

## 📁 Estrutura do Projeto

```
TechLearn/
├── back_end/                 # Backend Flask
│   ├── app.py               # Aplicação principal
│   ├── requirements.txt     # Dependências Python
│   ├── Procfile            # Configuração Heroku
│   └── techlearn.db        # Banco de dados SQLite
├── images/                  # Assets de imagem
├── paginas/                 # Páginas HTML
│   ├── login.html
│   ├── registro.html
│   ├── cursos.html
│   └── ...
├── scripts/                 # JavaScript
│   ├── script.js           # Script principal
│   ├── login.js
│   └── ...
├── styles/                  # CSS
│   ├── style.css           # Estilos principais
│   ├── login.css
│   └── ...
├── index.html              # Página inicial
└── README.md               # Este arquivo
```

## 🔧 Configuração Avançada

### Variáveis de Ambiente
```env
# Obrigatórias
SECRET_KEY=sua_chave_secreta_aqui
DATABASE_URL=postgresql://user:pass@host:port/db

# Opcionais
FLASK_ENV=production
DEBUG=False
PORT=5000
```

### Banco de Dados
- **Desenvolvimento**: SQLite (padrão)
- **Produção**: PostgreSQL (recomendado)

### Segurança
- Rate limiting implementado
- Validação de entrada rigorosa
- Sanitização de dados
- CORS configurado

## 🧪 Testes

### Testes Manuais
1. Teste de registro de usuário
2. Teste de login
3. Teste de autenticação Google
4. Teste de responsividade
5. Teste de acessibilidade

### Testes Automatizados (Futuro)
```bash
# Instalar dependências de teste
pip install pytest pytest-flask

# Executar testes
pytest tests/
```

## 📊 API Endpoints

### Autenticação
- `POST /api/register` - Registrar usuário
- `POST /api/login` - Login
- `POST /api/auth/google` - Login Google
- `POST /api/check-email` - Verificar email

### Usuários
- `GET /api/user/<id>` - Obter dados do usuário
- `PUT /api/user/<id>` - Atualizar usuário

### Sistema
- `GET /api/health` - Status da aplicação
- `GET /api/stats` - Estatísticas (admin)

## 🤝 Contribuição

### Como Contribuir
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- **JavaScript**: ES6+, modular, comentado
- **Python**: PEP 8, docstrings, type hints
- **CSS**: BEM methodology, variáveis CSS
- **HTML**: Semântico, acessível

### Checklist para PR
- [ ] Código testado localmente
- [ ] Responsividade verificada
- [ ] Acessibilidade testada
- [ ] Documentação atualizada
- [ ] Sem erros de linting

## 🐛 Problemas Conhecidos

- [ ] Implementar testes automatizados
- [ ] Adicionar mais cursos
- [ ] Melhorar sistema de gamificação
- [ ] Implementar cache

## 📈 Roadmap

### Versão 2.0
- [ ] Sistema de cursos em vídeo
- [ ] Certificados digitais
- [ ] Marketplace de projetos
- [ ] API pública

### Versão 3.0
- [ ] Inteligência artificial para correção
- [ ] Realidade aumentada
- [ ] Mobile app nativo
- [ ] Integração com GitHub

## 📞 Suporte

### Contato
- **Email**: magatonf2919@gmail.com
- **GitHub Issues**: [Abrir Issue](https://github.com/seu-usuario/TechLearn/issues)
- **Documentação**: [Wiki do Projeto](https://github.com/seu-usuario/TechLearn/wiki)

### Comunidade
- **Discord**: [Servidor TechLearn](https://discord.gg/techlearn)
- **Telegram**: [Canal TechLearn](https://t.me/techlearn)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- Comunidade open source
- Contribuidores do projeto
- Usuários que testaram e reportaram bugs
- Professores e mentores

## 🔗 Links Úteis

- **Site Oficial**: [https://magat0n.github.io/Tech-Learn-UNIMAR/](https://magat0n.github.io/Tech-Learn-UNIMAR/)
- **Documentação**: [Wiki do Projeto](https://github.com/seu-usuario/TechLearn/wiki)
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/TechLearn/issues)
- **Releases**: [GitHub Releases](https://github.com/seu-usuario/TechLearn/releases)

---

**Desenvolvido com ❤️ pela equipe TechLearn**
