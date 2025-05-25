from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime, timedelta
import os
import re
from dotenv import load_dotenv
import jwt
import psycopg2

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

# Modelo de Usuário
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=True)
    name = db.Column(db.String(100), nullable=True)
    picture = db.Column(db.String(200), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Funções de validação
def validate_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

def validate_password(password):
    # Mínimo 6 caracteres, pelo menos uma letra e um número
    if len(password) < 6:
        return False
    if not any(c.isalpha() for c in password):
        return False
    if not any(c.isdigit() for c in password):
        return False
    return True

def validate_username(username):
    # Mínimo 3 caracteres, apenas letras, números e underscore
    if len(username) < 3:
        return False
    if not re.match(r'^[a-zA-Z0-9_]+$', username):
        return False
    return True

# Criar todas as tabelas
with app.app_context():
    db.create_all()

# Rotas de autenticação
@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Verificar se todos os campos necessários estão presentes
        if not all(k in data for k in ['username', 'email', 'password']):
            return jsonify({'error': 'Dados incompletos'}), 400
        
        # Validar dados
        if not validate_username(data['username']):
            return jsonify({'error': 'Nome de usuário inválido. Deve ter no mínimo 3 caracteres e conter apenas letras, números e underscore.'}), 400
        
        if not validate_email(data['email']):
            return jsonify({'error': 'Email inválido'}), 400
        
        if not validate_password(data['password']):
            return jsonify({'error': 'Senha inválida. Deve ter no mínimo 6 caracteres, incluindo letras e números.'}), 400
        
        # Verificar se o usuário já existe
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'error': 'Nome de usuário já existe'}), 400
        
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email já cadastrado'}), 400
        
        # Criar novo usuário
        new_user = User(
            username=data['username'],
            email=data['email']
        )
        new_user.set_password(data['password'])
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({
            'message': 'Usuário registrado com sucesso',
            'user': {
                'id': new_user.id,
                'username': new_user.username,
                'email': new_user.email
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Erro ao registrar usuário'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not all(k in data for k in ['email', 'password']):
            return jsonify({'error': 'Dados incompletos'}), 400
        
        user = User.query.filter_by(email=data['email']).first()
        
        if user and user.check_password(data['password']):
            return jsonify({
                'message': 'Login realizado com sucesso',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            }), 200
        
        return jsonify({'error': 'Usuário ou senha inválidos'}), 401
        
    except Exception as e:
        return jsonify({'error': 'Erro ao realizar login'}), 500

@app.route('/api/check-username', methods=['POST'])
def check_username():
    try:
        data = request.get_json()
        username = data.get('username')
        
        if not username:
            return jsonify({'error': 'Nome de usuário não fornecido'}), 400
        
        if not validate_username(username):
            return jsonify({'error': 'Nome de usuário inválido'}), 400
        
        exists = User.query.filter_by(username=username).first() is not None
        return jsonify({'exists': exists}), 200
        
    except Exception as e:
        return jsonify({'error': 'Erro ao verificar nome de usuário'}), 500

@app.route('/api/check-email', methods=['POST'])
def check_email():
    try:
        data = request.get_json()
        email = data.get('email')
        
        if not email:
            return jsonify({'error': 'Email não fornecido'}), 400
        
        if not validate_email(email):
            return jsonify({'error': 'Email inválido'}), 400
        
        exists = User.query.filter_by(email=email).first() is not None
        return jsonify({'exists': exists}), 200
        
    except Exception as e:
        return jsonify({'error': 'Erro ao verificar email'}), 500

# Rota de autenticação com Google
@app.route('/api/auth/google', methods=['POST'])
def google_auth():
    try:
        data = request.get_json()
        credential = data.get('credential')
        
        if not credential:
            return jsonify({'error': 'Credencial não fornecida'}), 400

        # Decodifica o token JWT do Google
        decoded = jwt.decode(credential, options={"verify_signature": False})
        
        # Extrai informações do usuário
        email = decoded.get('email')
        name = decoded.get('name', '')
        picture = decoded.get('picture')
        google_id = decoded.get('sub')

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
            db.session.commit()

        # Retorna os dados do usuário
        return jsonify({
            'message': 'Login realizado com sucesso',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'name': user.name,
                'picture': user.picture
            }
        }), 200

    except Exception as e:
        return jsonify({'error': 'Erro ao autenticar com Google'}), 500

# Rota de verificação de saúde
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    app.run(debug=True) 