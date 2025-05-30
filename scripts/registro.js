// Configuração da API
const API_URL = 'https://seu-app.railway.app/api';  // Substitua pela URL do seu backend no Railway
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Elementos do DOM
const registerForm = document.getElementById('register-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const submitButton = document.querySelector('.login-btn');
const loadingSpinner = document.querySelector('.loading-spinner');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const confirmPasswordError = document.getElementById('confirm-password-error');

// Estado do formulário
let isFormValid = false;

// Funções para alternar a visibilidade da senha
function togglePassword() {
    const passwordInput = document.getElementById('password');
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
function validateName(name) {
    if (!name) {
        return 'O nome é obrigatório';
    }
    if (name.length < 3) {
        return 'O nome deve ter pelo menos 3 caracteres';
    }
    return '';
}

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

function validateConfirmPassword(password, confirmPassword) {
    if (!confirmPassword) {
        return 'Confirme sua senha';
    }
    if (password !== confirmPassword) {
        return 'As senhas não coincidem';
    }
    return '';
}

// Event Listeners
nameInput.addEventListener('input', () => {
    const error = validateName(nameInput.value);
    if (error) {
        showError(nameError, error);
    } else {
        clearError(nameError);
    }
    validateForm();
});

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

confirmPasswordInput.addEventListener('input', () => {
    const error = validateConfirmPassword(passwordInput.value, confirmPasswordInput.value);
    if (error) {
        showError(confirmPasswordError, error);
    } else {
        clearError(confirmPasswordError);
    }
    validateForm();
});

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', () => {
        const input = button.parentElement.querySelector('input');
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        button.querySelector('i').className = 
            type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    });
});

// Validação do formulário
function validateForm() {
    const nameError = validateName(nameInput.value);
    const emailError = validateEmail(emailInput.value);
    const passwordError = validatePassword(passwordInput.value);
    const confirmPasswordError = validateConfirmPassword(passwordInput.value, confirmPasswordInput.value);
    
    isFormValid = !nameError && !emailError && !passwordError && !confirmPasswordError;
    submitButton.disabled = !isFormValid;
}

// Manipulação do envio do formulário
registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    if (!isFormValid) return;

    setLoading(true);

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            })
        });

        const data = await response.json();

        if (response.ok) {
            showNotification('Conta criada com sucesso!', 'success');
            
            // Redireciona para a página de conta após um breve delay
            setTimeout(() => {
                window.location.href = 'conta.html';
            }, 1000);
        } else {
            throw new Error(data.error || 'Erro ao criar conta');
        }
    } catch (error) {
        console.error('Erro no registro:', error);
        showNotification(error.message || 'Erro ao criar conta', 'error');
    } finally {
        setLoading(false);
    }
});

// Registro com Google
function initializeGoogleSignIn() {
    const googleRegisterBtn = document.getElementById('google-register');
    
    googleRegisterBtn.addEventListener('click', () => {
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
        
        const result = await fetch(`${API_URL}/auth/google/register`, {
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
            showNotification('Conta criada com sucesso!', 'success');
            
            setTimeout(() => {
                window.location.href = 'conta.html';
            }, 1000);
        } else {
            throw new Error(data.error || 'Erro ao criar conta com Google');
        }
    } catch (error) {
        console.error('Erro no registro com Google:', error);
        showNotification(error.message || 'Erro ao criar conta com Google', 'error');
    } finally {
        setLoading(false);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o registro com Google
    initializeGoogleSignIn();
    
    // Validação inicial do formulário
    validateForm();
}); 