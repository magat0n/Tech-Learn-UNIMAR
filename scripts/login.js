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

// Função para validar o formulário de registro
function validateRegisterForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validações básicas
    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    if (password.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres!');
        return;
    }

    // Aqui você pode adicionar mais validações conforme necessário

    // Simula o registro do usuário
    const user = {
        name,
        email,
        password,
        level: 1,
        xp: 0,
        courses: []
    };

    // Salva o usuário no localStorage (em um ambiente real, isso seria feito no servidor)
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redireciona para a página inicial
    window.location.href = '../index.html';
}

// Função para validar o formulário de login
function validateLoginForm(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // Em um ambiente real, isso seria uma chamada à API
    // Por enquanto, vamos simular um login básico
    const user = {
        name: 'Usuário Teste',
        email,
        level: 5,
        xp: 2450,
        courses: []
    };

    // Salva o usuário no localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Se "lembrar de mim" estiver marcado, salva o email
    if (remember) {
        localStorage.setItem('rememberedEmail', email);
    } else {
        localStorage.removeItem('rememberedEmail');
    }

    // Redireciona para a página inicial
    window.location.href = '../index.html';
}

// Função para login social
function socialLogin(provider) {
    // Em um ambiente real, isso abriria uma janela de autenticação do provedor
    alert(`Login com ${provider} será implementado em breve!`);
}

// Adiciona os event listeners
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');

        let isValid = true;

        // Validação do e-mail
        if (!email.value.includes('@')) {
            emailError.textContent = 'Por favor, insira um e-mail válido.';
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        // Validação da senha
        if (password.value.length < 6) {
            passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres.';
            passwordError.style.display = 'block';
            isValid = false;
        } else {
            passwordError.style.display = 'none';
        }

        if (isValid) {
            alert('Login realizado com sucesso!');
            // Redirecionar para a página inicial
            window.location.href = '../index.html';
        }
    });

    registerForm.addEventListener('submit', validateRegisterForm);

    // Preenche o email se estiver salvo
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }

    // Adiciona event listeners para os botões de login social
    document.querySelector('.btn-social.google').addEventListener('click', () => socialLogin('Google'));
    document.querySelector('.btn-social.github').addEventListener('click', () => socialLogin('GitHub'));
});