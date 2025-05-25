// Configuração da API
const API_URL = 'https://seu-app.railway.app/api';  // Substitua pela URL do seu backend no Railway

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

// Função para login social
function socialLogin(provider) {
    if (provider === 'Google') {
        google.accounts.id.initialize({
            client_id: 'SEU_CLIENT_ID_GOOGLE', // Substitua pelo seu Client ID do Google
            callback: handleGoogleSignIn
        });
        google.accounts.id.prompt();
    } else {
        alert(`Login com ${provider} será implementado em breve!`);
    }
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

    // Inicializa o Google Sign-In
    initializeGoogleSignIn();
    initializePasswordToggle();
    initializeLoginForm();
});

// Inicializa o botão de login do Google
function initializeGoogleSignIn() {
    const googleLoginBtn = document.getElementById('google-login');
    
    googleLoginBtn.addEventListener('click', () => {
        google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleSignIn
        });
        
        google.accounts.id.prompt();
    });
}

// Manipula o login com Google
async function handleGoogleSignIn(response) {
    try {
        // Envia o token para o backend
        const result = await fetch(`${API_URL}/auth/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                credential: response.credential
            })
        });

        const data = await result.json();

        if (!result.ok) {
            throw new Error(data.error || 'Erro ao autenticar com Google');
        }

        // Salva os dados do usuário
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redireciona para a página principal
        window.location.href = '../index.html';
        
    } catch (error) {
        console.error('Erro:', error);
        showNotification(error.message, 'error');
    }
}

// Inicializa o toggle de visibilidade da senha
function initializePasswordToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling;
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            button.querySelector('img').src = type === 'password' ? 
                '../assets/eye.svg' : '../assets/eye-off.svg';
        });
    });
}

// Inicializa o formulário de login
function initializeLoginForm() {
    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

// Manipula o envio do formulário
async function handleFormSubmit(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Salva os dados do usuário
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Se "lembrar-me" estiver marcado, salva o email
            if (remember) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            showNotification('Login realizado com sucesso!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            throw new Error(data.error || 'Erro ao fazer login');
        }
    } catch (error) {
        console.error('Erro no login:', error);
        showNotification(error.message || 'Erro ao fazer login', 'error');
    }
}

// Mostra notificações
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Preenche o email se estiver salvo
const rememberedEmail = localStorage.getItem('rememberedEmail');
if (rememberedEmail) {
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }
}