// Configuração da API
const API_URL = 'https://seu-app.railway.app/api';  // Substitua pela URL do seu backend no Railway
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Elementos do DOM
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitButton = document.querySelector('.login-btn');
const loadingSpinner = document.querySelector('.loading-spinner');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

// Estado do formulário
let isFormValid = false;

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

// Funções de feedback visual
function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
    element.parentElement.querySelector('input').classList.add('error');
}

function clearError(element) {
    element.textContent = '';
    element.style.display = 'none';
    element.parentElement.querySelector('input').classList.remove('error');
}

function setLoading(isLoading) {
    submitButton.disabled = isLoading;
    loadingSpinner.style.display = isLoading ? 'block' : 'none';
    submitButton.querySelector('span').style.display = isLoading ? 'none' : 'inline';
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Funções de validação
function validateEmail(email) {
    if (!email) {
        return 'O email é obrigatório';
    }
    if (!EMAIL_REGEX.test(email)) {
        return 'Digite um email válido';
    }
    return '';
}

function validatePassword(password) {
    if (!password) {
        return 'A senha é obrigatória';
    }
    if (password.length < 6) {
        return 'A senha deve ter pelo menos 6 caracteres';
    }
    return '';
}

// Event Listeners
emailInput.addEventListener('input', () => {
    const error = validateEmail(emailInput.value);
    if (error) {
        showError(emailError, error);
    } else {
        clearError(emailError);
    }
    validateForm();
});

passwordInput.addEventListener('input', () => {
    const error = validatePassword(passwordInput.value);
    if (error) {
        showError(passwordError, error);
    } else {
        clearError(passwordError);
    }
    validateForm();
});

// Toggle password visibility
document.querySelector('.toggle-password').addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    document.querySelector('.toggle-password i').className = 
        type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
});

// Validação do formulário
function validateForm() {
    const emailError = validateEmail(emailInput.value);
    const passwordError = validatePassword(passwordInput.value);
    
    isFormValid = !emailError && !passwordError;
    submitButton.disabled = !isFormValid;
}

// Manipulação do envio do formulário
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    if (!isFormValid) return;

    setLoading(true);

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailInput.value,
                password: passwordInput.value
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Salva os dados do usuário
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Se "lembrar-me" estiver marcado, salva o email
            if (document.getElementById('remember').checked) {
                localStorage.setItem('rememberedEmail', emailInput.value);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            showNotification('Login realizado com sucesso!', 'success');
            
            // Redireciona após um breve delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            throw new Error(data.error || 'Erro ao fazer login');
        }
    } catch (error) {
        console.error('Erro no login:', error);
        showNotification(error.message || 'Erro ao fazer login', 'error');
    } finally {
        setLoading(false);
    }
});

// Login com Google
function initializeGoogleSignIn() {
    const googleLoginBtn = document.getElementById('google-login');
    
    googleLoginBtn.addEventListener('click', () => {
        google.accounts.id.initialize({
            client_id: 'SEU_CLIENT_ID_GOOGLE', // Substitua pelo seu Client ID do Google
            callback: handleGoogleSignIn
        });
        
        google.accounts.id.prompt();
    });
}

async function handleGoogleSignIn(response) {
    try {
        setLoading(true);
        
        const result = await fetch(`${API_URL}/auth/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                credential: response.credential
            })
        });

        const data = await result.json();

        if (result.ok) {
            localStorage.setItem('user', JSON.stringify(data.user));
            showNotification('Login realizado com sucesso!', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            throw new Error(data.error || 'Erro ao fazer login com Google');
        }
    } catch (error) {
        console.error('Erro no login com Google:', error);
        showNotification(error.message || 'Erro ao fazer login com Google', 'error');
    } finally {
        setLoading(false);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Preenche o email se estiver salvo
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }

    // Inicializa o login com Google
    initializeGoogleSignIn();
    
    // Validação inicial do formulário
    validateForm();
});