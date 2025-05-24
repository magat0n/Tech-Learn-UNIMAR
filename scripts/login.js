// Configuração da API
const API_URL = 'http://localhost:5000/api';

// Funções para alternar a visibilidade da senha
function togglePassword() {
    const passwordInput = document.getElementById('password');
    togglePasswordVisibility(passwordInput);
}

function toggleRegisterPassword() {
    const passwordInput = document.getElementById('registerPassword');
    togglePasswordVisibility(passwordInput);
}

function toggleConfirmPassword() {
    const passwordInput = document.getElementById('confirmPassword');
    togglePasswordVisibility(passwordInput);
}

function togglePasswordVisibility(input) {
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
}

// Funções para alternar entre formulários de login e registro
function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

// Função para mostrar mensagens de erro
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Função para limpar mensagens de erro
function clearErrors() {
    const errorElements = document.getElementsByClassName('error-message');
    Array.from(errorElements).forEach(element => {
        element.style.display = 'none';
        element.textContent = '';
    });
}

// Função para validar o formulário de registro
async function validateRegisterForm(event) {
    event.preventDefault();
    clearErrors();
    
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validações básicas
    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'As senhas não coincidem!');
        return;
    }

    if (password.length < 6) {
        showError('registerPasswordError', 'A senha deve ter pelo menos 6 caracteres!');
        return;
    }

    try {
        // Verificar se o usuário já existe
        const usernameCheck = await fetch(`${API_URL}/check-username`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });
        const usernameData = await usernameCheck.json();
        
        if (usernameData.exists) {
            showError('registerUsernameError', 'Este nome de usuário já está em uso!');
            return;
        }

        // Verificar se o email já existe
        const emailCheck = await fetch(`${API_URL}/check-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const emailData = await emailCheck.json();
        
        if (emailData.exists) {
            showError('registerEmailError', 'Este email já está cadastrado!');
            return;
        }

        // Registrar o usuário
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            showLoginForm('conta.html');
        } else {
            showError('registerUsernameError', data.error || 'Erro ao realizar cadastro');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor');
    }
}

// Função para validar o formulário de login
async function validateLoginForm(event) {
    event.preventDefault();
    clearErrors();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Salvar dados do usuário
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            
            // Se "lembrar de mim" estiver marcado, salva o username
            if (remember) {
                localStorage.setItem('rememberedUsername', username);
            } else {
                localStorage.removeItem('rememberedUsername');
            }

            // Redirecionar para a página de perfil
            window.location.href = 'conta.html';
        } else {
            showError('usernameError', data.error || 'Erro ao fazer login');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor');
    }
}

// Função para login social
function socialLogin(provider) {
    alert(`Login com ${provider} será implementado em breve!`);
}

// Adiciona os event listeners
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginForm.addEventListener('submit', validateLoginForm);
    registerForm.addEventListener('submit', validateRegisterForm);

    // Preenche o username se estiver salvo
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
        document.getElementById('username').value = rememberedUsername;
        document.getElementById('remember').checked = true;
    }

    // Adiciona event listeners para os botões de login social
    document.querySelector('.btn-social.google').addEventListener('click', () => socialLogin('Google'));
    document.querySelector('.btn-social.github').addEventListener('click', () => socialLogin('GitHub'));
});