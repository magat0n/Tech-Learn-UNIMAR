// Configurações globais
const CONFIG = {
    SCROLL_THRESHOLD: 50,
    ANIMATION_DELAY: 200,
    CHAT_RESPONSE_DELAY: 500,
    DEBOUNCE_DELAY: 150
};

// Utilitários
const Utils = {
    // Debounce para otimizar eventos de scroll
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Verificar se elemento está visível na tela
    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Adicionar efeito ripple
    createRipple(event, element) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        element.appendChild(ripple);

        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

        setTimeout(() => ripple.remove(), 600);
    }
};

// Gerenciador de estado da aplicação
const AppState = {
    activeFilters: {
        level: 'all',
        language: 'all'
    },
    
    updateFilter(type, value) {
        this.activeFilters[type] = value;
    },
    
    getFilters() {
        return { ...this.activeFilters };
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização dos componentes
    initializeMobileMenu();
    initializeCodeEditor();
    initializeCourseCards();
    initializeNavigation();
    initializeHeaderScroll();
    initializeScrollAnimations();
    initializeChallengeFilters();
    initializePagination();
    initializeChat();
    
    // Atualizar interface do usuário
    updateUserInterface();
});

// Componente: Menu Mobile
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuToggle.innerHTML = mobileMenu.classList.contains('active') ? '✕' : '☰';
        });
    }
}

// Componente: Editor de Código
function initializeCodeEditor() {
    const tabs = document.querySelectorAll('.tab');
    const runButtons = document.querySelectorAll('.code-actions .icon-btn:last-child');
    const copyButtons = document.querySelectorAll('.code-actions .icon-btn:first-child');
    
    // Gerenciar abas
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const tabName = tab.textContent.trim();
            const codeContent = document.querySelector('.code-content pre code');
            
            if (codeContent) {
                codeContent.style.opacity = '0';
                
                setTimeout(() => {
                    codeContent.innerHTML = getTabContent(tabName);
                    codeContent.style.opacity = '1';
                }, CONFIG.ANIMATION_DELAY);
            }
        });
    });
    
    // Botão de execução
    runButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.9)';
            setTimeout(() => button.style.transform = 'scale(1)', CONFIG.ANIMATION_DELAY);
            
            button.textContent = '⏳';
            
            setTimeout(() => {
                const outputTab = document.querySelector('.tab:nth-child(3)');
                if (outputTab) outputTab.click();
                button.textContent = '▶️';
            }, 800);
        });
    });
    
    // Botão de cópia
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            try {
                const codeContent = document.querySelector('.code-content pre code').textContent;
                await navigator.clipboard.writeText(codeContent);
                
                showButtonFeedback(button, '✓', '#10b981');
            } catch (err) {
                console.error('Erro ao copiar:', err);
                showButtonFeedback(button, '✗', '#ef4444');
            }
        });
    });
}

// Função auxiliar para conteúdo das abas
function getTabContent(tabName) {
    const contentMap = {
        'Saída': `// Saída:
"Olá, Programador!"
"Ganhe até 1000 XP em desafios!"
"Comece a aprender agora!"`,
        'Instruções': `// Instruções:
// 1. Este é uma introdução ao editor de código
// 2. Você pode escrever e executar código JavaScript
// 3. Tente modificar a função bemVindo()
// 4. Pressione o botão executar para ver o resultado`,
        'Código': `// Bem-vindo ao TechLearn!
// Experimente nosso editor de código

function bemVindo() {
  const mensagem = "Olá, Programador!";
  const xp = 1000;
  
  console.log(mensagem);
  console.log(\`Ganhe até \${xp} XP em desafios!\`);
  
  return "Comece a aprender agora!";
}

// Execute o código para ver o resultado
bemVindo();`
    };
    
    return contentMap[tabName] || contentMap['Código'];
}

// Função auxiliar para feedback de botões
function showButtonFeedback(button, text, color) {
    const originalText = button.textContent;
    button.textContent = text;
    button.style.color = color;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.color = '';
    }, 2000);
}

// Componente: Cards de Cursos
function initializeCourseCards() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const progressFill = card.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = '60%';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const progressFill = card.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = '0%';
            }
        });
    });
}

// Componente: Navegação
function initializeNavigation() {
    const navLinks = document.querySelectorAll('header a, .footer a');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggle = document.getElementById('menuToggle');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Fechar menu mobile
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        menuToggle.innerHTML = '☰';
                    }
                }
            }
        });
    });
    
    // CTA Button com efeito ripple
    const ctaButton = document.querySelector('.cta .btn-primary');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            Utils.createRipple(e, ctaButton);
        });
    }
}

// Componente: Header Scroll
function initializeHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const handleScroll = Utils.debounce(() => {
        if (window.scrollY > CONFIG.SCROLL_THRESHOLD) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    }, CONFIG.DEBOUNCE_DELAY);
    
    window.addEventListener('scroll', handleScroll);
}

// Componente: Animações de Scroll
function initializeScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .course-card, .section-header, .cta-content, .challenge-card');
    
    // Inicializar elementos com opacidade 0
    elements.forEach(element => {
        element.style.transform = 'translateY(20px)';
        element.style.opacity = '0';
        element.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
    });
    
    const animateOnScroll = Utils.debounce(() => {
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }
        });
    }, CONFIG.DEBOUNCE_DELAY);
    
    window.addEventListener('scroll', animateOnScroll);
    setTimeout(animateOnScroll, 100);
}

// Componente: Filtros de Desafios
function initializeChallengeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const challengeCards = document.querySelectorAll('.challenge-card');
    
    if (!filterButtons.length || !challengeCards.length) return;
    
    const filterChallenges = () => {
        const filters = AppState.getFilters();
        
        challengeCards.forEach(card => {
            const level = card.getAttribute('data-level');
            const language = card.getAttribute('data-language');
            
            const levelMatch = filters.level === 'all' || level === filters.level;
            const languageMatch = filters.language === 'all' || language === filters.language;
            
            if (levelMatch && languageMatch) {
                card.style.display = 'flex';
                card.style.opacity = '0';
                setTimeout(() => card.style.opacity = '1', 50);
            } else {
                card.style.display = 'none';
            }
        });
        
        showNoResultsMessage(challengeCards, filters);
    };
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterGroup = button.closest('.filter-options');
            filterGroup.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            button.classList.add('active');
            
            const filterType = button.closest('.filter-group').querySelector('label').textContent.toLowerCase().replace(':', '');
            AppState.updateFilter(filterType, button.getAttribute('data-filter'));
            
            filterChallenges();
        });
    });
}

// Função auxiliar para mensagem de "nenhum resultado"
function showNoResultsMessage(cards, filters) {
    const visibleCards = document.querySelectorAll('.challenge-card[style*="display: flex"]');
    const existingNoResults = document.querySelector('.no-results');
    
    if (visibleCards.length === 0) {
        if (!existingNoResults) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = '<p>Nenhum desafio encontrado com os filtros selecionados.</p>';
            document.querySelector('.challenges-grid').appendChild(noResults);
        }
    } else if (existingNoResults) {
        existingNoResults.remove();
    }
}

// Componente: Paginação
function initializePagination() {
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', () => {
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            if (!button.classList.contains('next')) {
                const pageNumber = button.textContent;
                console.log(`Carregando página ${pageNumber}...`);
                
                const challengesGrid = document.querySelector('.challenges-grid');
                if (challengesGrid) {
                    challengesGrid.style.opacity = '0.5';
                    setTimeout(() => challengesGrid.style.opacity = '1', 500);
                }
            }
        });
    });
}

// Componente: Chat
function initializeChat() {
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatToggle || !chatWindow) return;
    
    const autoResponses = {
        'oi': 'Olá! Como posso ajudar você hoje?',
        'ola': 'Olá! Como posso ajudar você hoje?',
        'ajuda': 'Claro! Em que posso ajudar? Você pode me fazer perguntas sobre cursos, problemas técnicos, pagamentos ou sua conta.',
        'curso': 'Temos diversos cursos disponíveis. Você pode navegar pela seção de cursos para ver todos os títulos disponíveis. Precisa de ajuda para encontrar algum curso específico?',
        'preco': 'Nossos planos começam a partir de R$ 29,90/mês. Você pode ver todos os planos e preços na seção de assinaturas.',
        'pagamento': 'Aceitamos cartões de crédito, boleto bancário e PIX. Precisa de ajuda com algum pagamento específico?',
        'senha': 'Para recuperar sua senha, clique no link "Esqueceu a senha?" na página de login. Você receberá um email com instruções para redefinir sua senha.',
        'xp': 'O XP é ganho completando cursos, desafios e projetos. Quanto mais difícil a atividade, mais XP você ganha.',
        'offline': 'Atualmente, os cursos só podem ser acessados online. Estamos trabalhando em uma funcionalidade de download para acesso offline.'
    };
    
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'system'}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function processUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = 'Desculpe, não entendi sua pergunta. Pode reformular ou escolher um dos tópicos: cursos, preços, pagamento, senha, xp, offline.';
        
        for (const [keyword, autoResponse] of Object.entries(autoResponses)) {
            if (lowerMessage.includes(keyword)) {
                response = autoResponse;
                break;
            }
        }
        
        setTimeout(() => addMessage(response), CONFIG.CHAT_RESPONSE_DELAY);
    }
    
    function sendUserMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            processUserMessage(message);
        }
    }
    
    chatToggle.addEventListener('click', () => chatWindow.classList.add('active'));
    closeChat.addEventListener('click', () => chatWindow.classList.remove('active'));
    sendMessage.addEventListener('click', sendUserMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendUserMessage();
    });
}

// Funções de gerenciamento de usuário
function updateUserInterface() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const userMenu = document.querySelector('.user-menu');
    const mobileUserInfo = document.querySelector('.mobile-user-info');
    const avatar = document.querySelector('.avatar');
    const levelBadge = document.querySelector('.level-badge');
    const xpBadge = document.querySelector('.xp-badge');

    if (user && userMenu && mobileUserInfo) {
        const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
        if (avatar) avatar.textContent = initials;
        if (levelBadge) levelBadge.textContent = `Nível ${user.level}`;
        if (xpBadge) xpBadge.textContent = `${user.xp} XP`;

        userMenu.style.display = 'flex';
        mobileUserInfo.style.display = 'flex';
    } else if (userMenu && mobileUserInfo) {
        userMenu.style.display = 'none';
        mobileUserInfo.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
}