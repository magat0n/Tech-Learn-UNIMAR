from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime, timedelta
import os
import re
import logging
from dotenv import load_dotenv
import jwt
import psycopg2
from functools import wraps
import time

# Configuração de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Carrega variáveis de ambiente
load_dotenv()

app = Flask(__name__)

# Configuração do CORS
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://tech-learn-unimar.vercel.app",
            "http://localhost:3000",
            "http://localhost:5000"
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Configuração do banco de dados
DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///techlearn.db')
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', os.urandom(24))

db = SQLAlchemy(app)

# Rate limiting simples
class RateLimiter:
    def __init__(self):
        self.requests = {}
    
    def is_allowed(self, ip, limit=100, window=3600):
        now = time.time()
        if ip not in self.requests:
            self.requests[ip] = []
        
        # Remove requests antigas
        self.requests[ip] = [req_time for req_time in self.requests[ip] if now - req_time < window]
        
        if len(self.requests[ip]) >= limit:
            return False
        
        self.requests[ip].append(now)
        return True

rate_limiter = RateLimiter()

# Decorator para rate limiting
def rate_limit(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        ip = request.remote_addr
        if not rate_limiter.is_allowed(ip):
            return jsonify({'error': 'Rate limit exceeded'}), 429
        return f(*args, **kwargs)
    return decorated_function

# Decorator para logging de erros
def log_errors(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as e:
            logger.error(f"Erro na rota {f.__name__}: {str(e)}")
            return jsonify({'error': 'Erro interno do servidor'}), 500
    return decorated_function

# Modelo de Usuário
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=True)
    name = db.Column(db.String(100), nullable=False)
    picture = db.Column(db.String(200), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, nullable=True)
    is_active = db.Column(db.Boolean, default=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'picture': self.picture,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None
        }

# Funções de validação aprimoradas
def validate_email(email):
    if not email or not isinstance(email, str):
        return False
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password(password):
    if not password or not isinstance(password, str):
        return False
    if len(password) < 8:
        return False
    if not any(c.isalpha() for c in password):
        return False
    if not any(c.isdigit() for c in password):
        return False
    if not any(c.isupper() for c in password):
        return False
    return True

def validate_name(name):
    if not name or not isinstance(name, str):
        return False
    if len(name.strip()) < 2:
        return False
    if len(name) > 100:
        return False
    return True

# Criar todas as tabelas
with app.app_context():
    db.create_all()

# Rotas de autenticação
@app.route('/api/register', methods=['POST'])
@rate_limit
@log_errors
def register():
    data = request.get_json()
    
    # Verificar se todos os campos necessários estão presentes
    required_fields = ['name', 'email', 'password']
    if not all(k in data for k in required_fields):
        return jsonify({'error': 'Dados incompletos'}), 400
    
    # Validar dados
    if not validate_name(data['name']):
        return jsonify({'error': 'Nome inválido. Deve ter entre 2 e 100 caracteres.'}), 400
    
    if not validate_email(data['email']):
        return jsonify({'error': 'Email inválido'}), 400
    
    if not validate_password(data['password']):
        return jsonify({'error': 'Senha inválida. Deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas e números.'}), 400
    
    # Verificar se o email já existe
    if User.query.filter_by(email=data['email'].lower()).first():
        return jsonify({'error': 'Email já cadastrado'}), 400
    
    try:
        # Criar novo usuário
        new_user = User(
            name=data['name'].strip(),
            email=data['email'].lower()
        )
        new_user.set_password(data['password'])
        
        db.session.add(new_user)
        db.session.commit()
        
        logger.info(f"Novo usuário registrado: {new_user.email}")
        
        return jsonify({
            'message': 'Usuário registrado com sucesso',
            'user': new_user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Erro ao registrar usuário: {str(e)}")
        return jsonify({'error': 'Erro ao registrar usuário'}), 500

@app.route('/api/login', methods=['POST'])
@rate_limit
@log_errors
def login():
    data = request.get_json()
    
    if not all(k in data for k in ['email', 'password']):
        return jsonify({'error': 'Dados incompletos'}), 400
    
    email = data['email'].lower()
    password = data['password']
    
    user = User.query.filter_by(email=email).first()
    
    if user and user.check_password(password):
        # Atualizar último login
        user.last_login = datetime.utcnow()
        db.session.commit()
        
        logger.info(f"Login realizado: {user.email}")
        
        return jsonify({
            'message': 'Login realizado com sucesso',
            'user': user.to_dict()
        }), 200
    
    logger.warning(f"Tentativa de login falhou para: {email}")
    return jsonify({'error': 'Usuário ou senha inválidos'}), 401

@app.route('/api/check-email', methods=['POST'])
@rate_limit
@log_errors
def check_email():
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        return jsonify({'error': 'Email não fornecido'}), 400
    
    if not validate_email(email):
        return jsonify({'error': 'Email inválido'}), 400
    
    exists = User.query.filter_by(email=email.lower()).first() is not None
    return jsonify({'exists': exists}), 200

# Rota de autenticação com Google
@app.route('/api/auth/google', methods=['POST'])
@rate_limit
@log_errors
def google_auth():
    data = request.get_json()
    credential = data.get('credential')
    
    if not credential:
        return jsonify({'error': 'Credencial não fornecida'}), 400

    try:
        # Decodifica o token JWT do Google
        decoded = jwt.decode(credential, options={"verify_signature": False})
        
        # Extrai informações do usuário
        email = decoded.get('email', '').lower()
        name = decoded.get('name', '').strip()
        picture = decoded.get('picture')
        google_id = decoded.get('sub')

        if not email or not name:
            return jsonify({'error': 'Dados do Google inválidos'}), 400

        # Verifica se o usuário já existe
        user = User.query.filter_by(email=email).first()
        
        if not user:
            # Cria novo usuário
            user = User(
                email=email,
                name=name,
                picture=picture
            )
            db.session.add(user)
            logger.info(f"Novo usuário Google registrado: {email}")
        
        # Atualizar último login
        user.last_login = datetime.utcnow()
        db.session.commit()

        logger.info(f"Login Google realizado: {user.email}")

        # Retorna os dados do usuário
        return jsonify({
            'message': 'Login realizado com sucesso',
            'user': user.to_dict()
        }), 200

    except jwt.InvalidTokenError:
        return jsonify({'error': 'Token do Google inválido'}), 400
    except Exception as e:
        logger.error(f"Erro na autenticação Google: {str(e)}")
        return jsonify({'error': 'Erro ao autenticar com Google'}), 500

# Rota para obter dados do usuário
@app.route('/api/user/<int:user_id>', methods=['GET'])
@rate_limit
@log_errors
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'Usuário não encontrado'}), 404
    
    return jsonify({'user': user.to_dict()}), 200

# Rota para atualizar dados do usuário
@app.route('/api/user/<int:user_id>', methods=['PUT'])
@rate_limit
@log_errors
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'Usuário não encontrado'}), 404
    
    data = request.get_json()
    
    if 'name' in data:
        if not validate_name(data['name']):
            return jsonify({'error': 'Nome inválido'}), 400
        user.name = data['name'].strip()
    
    if 'picture' in data:
        user.picture = data['picture']
    
    try:
        db.session.commit()
        logger.info(f"Usuário atualizado: {user.email}")
        
        return jsonify({
            'message': 'Usuário atualizado com sucesso',
            'user': user.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        logger.error(f"Erro ao atualizar usuário: {str(e)}")
        return jsonify({'error': 'Erro ao atualizar usuário'}), 500

# Rota de verificação de saúde
@app.route('/api/health', methods=['GET'])
def health_check():
    try:
        # Verificar conexão com banco de dados
        db.session.execute('SELECT 1')
        return jsonify({
            'status': 'ok',
            'database': 'connected',
            'timestamp': datetime.utcnow().isoformat()
        }), 200
    except Exception as e:
        logger.error(f"Health check falhou: {str(e)}")
        return jsonify({
            'status': 'error',
            'database': 'disconnected',
            'error': str(e)
        }), 500

# Rota de estatísticas (para admin)
@app.route('/api/stats', methods=['GET'])
@rate_limit
@log_errors
def get_stats():
    try:
        total_users = User.query.count()
        active_users = User.query.filter_by(is_active=True).count()
        today_users = User.query.filter(
            User.created_at >= datetime.utcnow().date()
        ).count()
        
        return jsonify({
            'total_users': total_users,
            'active_users': active_users,
            'today_users': today_users
        }), 200
    except Exception as e:
        logger.error(f"Erro ao obter estatísticas: {str(e)}")
        return jsonify({'error': 'Erro ao obter estatísticas'}), 500

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=int(os.environ.get('PORT', 5000))) 