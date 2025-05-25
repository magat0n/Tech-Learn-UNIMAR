// Variáveis globais
let currentSection = 'profile';
const sections = ['profile', 'account', 'security'];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializePasswordStrength();
    initializeCharCounter();
    initializeTheme();
    loadUserData();
});

// Navegação entre seções
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.dataset.section;
            switchSection(section);
        });
    });
}

function switchSection(section) {
    // Atualiza botões de navegação
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === section);
    });

    // Atualiza seções visíveis
    sections.forEach(s => {
        const sectionElement = document.getElementById(`${s}-section`);
        sectionElement.classList.toggle('active', s === section);
    });

    currentSection = section;
}

// Gerenciamento de perfil
function updateProfile() {
    const profileData = {
        name: document.getElementById('name').value,
        username: document.getElementById('username').value,
        bio: document.getElementById('bio').value,
        location: document.getElementById('location').value,
        website: document.getElementById('website').value
    };

    // Validação básica
    if (!profileData.name || !profileData.username) {
        showNotification('Nome e nome de usuário são obrigatórios', 'error');
        return;
    }

    // Aqui você pode adicionar a lógica para enviar os dados para o servidor
    console.log('Dados do perfil:', profileData);
    showNotification('Perfil atualizado com sucesso!', 'success');
}

function resetProfile() {
    document.getElementById('profile-form').reset();
    showNotification('Formulário de perfil resetado', 'success');
}

// Gerenciamento de conta
function updateAccount() {
    const accountData = {
        email: document.getElementById('email').value,
        language: document.getElementById('language').value,
        theme: document.getElementById('theme').value,
        notifications: document.getElementById('notifications').checked
    };

    // Validação básica
    if (!accountData.email) {
        showNotification('Email é obrigatório', 'error');
        return;
    }

    // Aqui você pode adicionar a lógica para enviar os dados para o servidor
    console.log('Dados da conta:', accountData);
    showNotification('Configurações atualizadas com sucesso!', 'success');
}

function resetAccount() {
    document.getElementById('account-form').reset();
    showNotification('Formulário de conta resetado', 'success');
}

// Gerenciamento de segurança
function updateSecurity() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const twoFactor = document.getElementById('two-factor').checked;

    // Validações
    if (!currentPassword) {
        showNotification('Por favor, insira sua senha atual', 'error');
        return;
    }

    if (newPassword) {
        if (newPassword !== confirmPassword) {
            showNotification('As senhas não coincidem!', 'error');
            return;
        }

        const passwordStrength = calculatePasswordStrength(newPassword);
        if (passwordStrength.score < 50) {
            showNotification('A senha é muito fraca. Por favor, escolha uma senha mais forte.', 'error');
            return;
        }
    }

    const securityData = {
        currentPassword,
        newPassword: newPassword || undefined,
        twoFactor
    };

    // Simulação de envio para o servidor
    console.log('Dados de segurança:', securityData);
    showNotification('Configurações de segurança atualizadas com sucesso!', 'success');
}

function resetSecurity() {
    document.getElementById('security-form').reset();
    updatePasswordStrength();
    updatePasswordRequirements();
    showNotification('Formulário de segurança resetado', 'success');
}

function initializePasswordStrength() {
    const passwordInput = document.getElementById('new-password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');

    passwordInput.addEventListener('input', () => {
        updatePasswordStrength();
        updatePasswordRequirements();
    });
}

function updatePasswordStrength() {
    const password = document.getElementById('new-password').value;
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    const strength = calculatePasswordStrength(password);
    
    // Remove classes anteriores
    strengthBar.classList.remove('weak', 'medium', 'strong', 'very-strong');
    
    // Adiciona a classe apropriada
    if (strength.score >= 75) {
        strengthBar.classList.add('very-strong');
    } else if (strength.score >= 50) {
        strengthBar.classList.add('strong');
    } else if (strength.score >= 25) {
        strengthBar.classList.add('medium');
    } else {
        strengthBar.classList.add('weak');
    }
    
    strengthText.textContent = strength.message;
}

function calculatePasswordStrength(password) {
    let score = 0;
    let message = 'Muito fraca';
    let color = '#dc3545';

    if (!password) {
        return { score: 0, message: 'Digite uma senha', color };
    }

    // Comprimento
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 10;

    // Complexidade
    if (password.match(/[A-Z]/)) score += 15;
    if (password.match(/[a-z]/)) score += 15;
    if (password.match(/[0-9]/)) score += 15;
    if (password.match(/[^A-Za-z0-9]/)) score += 20;

    // Determina a força
    if (score >= 85) {
        message = 'Muito forte';
        color = '#198754';
    } else if (score >= 70) {
        message = 'Forte';
        color = '#28a745';
    } else if (score >= 50) {
        message = 'Média';
        color = '#ffc107';
    } else if (score >= 25) {
        message = 'Fraca';
        color = '#fd7e14';
    }

    return { score, message, color };
}

function updatePasswordRequirements() {
    const password = document.getElementById('new-password').value;
    const requirements = document.querySelectorAll('.password-requirements li');

    requirements.forEach(req => {
        const isValid = checkRequirement(password, req.dataset.requirement);
        req.classList.toggle('valid', isValid);
        req.classList.toggle('invalid', !isValid);
        
        const icon = req.querySelector('i');
        icon.className = isValid ? 'fas fa-check' : 'fas fa-times';
    });
}

function checkRequirement(password, requirement) {
    switch (requirement) {
        case 'length':
            return password.length >= 8;
        case 'uppercase':
            return /[A-Z]/.test(password);
        case 'lowercase':
            return /[a-z]/.test(password);
        case 'number':
            return /[0-9]/.test(password);
        case 'special':
            return /[^A-Za-z0-9]/.test(password);
        default:
            return false;
    }
}

// Toggle de visibilidade da senha
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        
        const icon = this.querySelector('i');
        icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    });
});

function initializeCharCounter() {
    const bioTextarea = document.getElementById('bio');
    const charCounter = document.querySelector('.char-counter');
    const maxLength = 200;

    bioTextarea.addEventListener('input', () => {
        const length = bioTextarea.value.length;
        charCounter.textContent = `${length}/${maxLength}`;
        
        if (length > maxLength) {
            bioTextarea.value = bioTextarea.value.substring(0, maxLength);
            charCounter.textContent = `${maxLength}/${maxLength}`;
        }
    });
}

function initializeTheme() {
    const themeSelect = document.getElementById('theme');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);

    themeSelect.addEventListener('change', (e) => {
        const theme = e.target.value;
        applyTheme(theme);
        localStorage.setItem('theme', theme);
    });
}

function applyTheme(theme) {
    document.body.className = theme;
}

function loadUserData() {
    // Aqui você pode adicionar a lógica para carregar os dados do usuário do servidor
    // Por enquanto, vamos apenas simular alguns dados
    const mockUserData = {
        name: 'João Silva',
        username: 'joaosilva',
        bio: 'Desenvolvedor web apaixonado por tecnologia',
        location: 'São Paulo, SP',
        website: 'https://joaosilva.dev',
        email: 'joao@email.com',
        language: 'pt-BR',
        theme: 'light',
        notifications: true
    };

    // Preenche os campos com os dados
    Object.entries(mockUserData).forEach(([key, value]) => {
        const element = document.getElementById(key);
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = value;
            } else {
                element.value = value;
            }
        }
    });

    // Atualiza o contador de caracteres da bio
    const bioTextarea = document.getElementById('bio');
    const charCounter = document.querySelector('.char-counter');
    charCounter.textContent = `${bioTextarea.value.length}/200`;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
