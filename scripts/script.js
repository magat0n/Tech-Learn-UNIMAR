document.addEventListener('DOMContentLoaded', () => {
    // Toggle do menu mobile com animação aprimorada
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            
            // Altera o ícone do menu com base no estado aberto/fechado
            if (mobileMenu.classList.contains('active')) {
                menuToggle.innerHTML = '✕';
            } else {
                menuToggle.innerHTML = '☰';
            }
        });
    }
    
    // Abas do Editor de Código com interação melhorada
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove a classe ativa de todas as abas
            tabs.forEach(t => t.classList.remove('active'));
            
            // Adiciona a classe ativa à aba clicada
            tab.classList.add('active');
            
            // Mostra o conteúdo correspondente
            const tabName = tab.textContent.trim();
            const codeContent = document.querySelector('.code-content pre code');
            
            // Adiciona uma animação sutil para a mudança de conteúdo
            if (codeContent) {
                codeContent.style.opacity = '0';
                
                setTimeout(() => {
                    if (tabName === 'Saída') {
                        codeContent.innerHTML = 
                        `// Saída:
"Olá, Programador!"
"Ganhe até 1000 XP em desafios!"
"Comece a aprender agora!"`;
                    } else if (tabName === 'Instruções') {
                        codeContent.innerHTML = 
                        `// Instruções:
// 1. Este é uma introdução ao editor de código
// 2. Você pode escrever e executar código JavaScript
// 3. Tente modificar a função bemVindo()
// 4. Pressione o botão executar para ver o resultado`;
                    } else {
                        codeContent.innerHTML = 
                        `// Bem-vindo ao TechLearn!
// Experimente nosso editor de código

function bemVindo() {
  const mensagem = "Olá, Programador!";
  const xp = 1000;
  
  console.log(mensagem);
  console.log(\`Ganhe até \${xp} XP em desafios!\`);
  
  return "Comece a aprender agora!";
}

// Execute o código para ver o resultado
bemVindo();`;
                    }
                    
                    codeContent.style.opacity = '1';
                }, 200);
            }
        });
    });
    
    // Simulação de botão de execução com feedback melhorado
    const runButtons = document.querySelectorAll('.code-actions .icon-btn:last-child');
    
    runButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Feedback visual para o clique no botão
            button.style.transform = 'scale(0.9)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
            
            // Simula a execução do código com estado de carregamento
            button.textContent = '⏳';
            
            setTimeout(() => {
                // Encontra e ativa a aba de saída
                const outputTab = document.querySelector('.tab:nth-child(3)');
                if (outputTab) {
                    outputTab.click();
                }
                button.textContent = '▶️';
            }, 800);
        });
    });
    
    // Botão de cópia com feedback melhorado
    const copyButtons = document.querySelectorAll('.code-actions .icon-btn:first-child');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Obtém o conteúdo do código
            const codeContent = document.querySelector('.code-content pre code').textContent;
            
            // Usa a API de Clipboard para copiar o código
            navigator.clipboard.writeText(codeContent)
                .then(() => {
                    // Mostra feedback temporário
                    const originalText = button.textContent;
                    button.textContent = '✓';
                    button.style.color = '#10b981'; // cor de sucesso
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.color = '';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Erro ao copiar: ', err);
                    // Mostra feedback de erro
                    button.textContent = '✗';
                    button.style.color = '#ef4444'; // cor de erro
                    
                    setTimeout(() => {
                        button.textContent = '📋';
                        button.style.color = '';
                    }, 2000);
                });
        });
    });
    
    // Efeito de hover nos cards de cursos com animação melhorada
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Anima os cards e a barra de progresso quando um mouse passa por cima
            const progressFill = card.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = '60%'; // Mostra algum progresso ao passar o mouse
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Reseta a barra de progresso quando o mouse sai
            const progressFill = card.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = '0%';
            }
        });
    });
    
    // Rolagem suave para links de navegação
    const navLinks = document.querySelectorAll('header a, .footer a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Previne o comportamento padrão apenas para links de hash
            if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Adiciona rolagem suave com efeito
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Considera o cabeçalho
                        behavior: 'smooth'
                    });
                    
                    // Fecha o menu mobile se estiver aberto
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        menuToggle.innerHTML = '☰';
                    }
                }
            }
        });
    });
    
    // Adiciona animação para o botão de CTA com interação melhorada
    const ctaButton = document.querySelector('.cta .btn-primary');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            // Adiciona efeito ripple
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ctaButton.appendChild(ripple);
            
            const rect = ctaButton.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Adiciona sombra ao cabeçalho durante a rolagem
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
        });
    }

    // Animar os elementos na página ao fazer scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .course-card, .section-header, .cta-content, .challenge-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }
        });
    };
    
    // Inicializa os elementos com opacidade 0 para a animação
    document.querySelectorAll('.feature-card, .course-card, .section-header:not(.hero *), .cta-content, .challenge-card').forEach(element => {
        element.style.transform = 'translateY(20px)';
        element.style.opacity = '0';
        element.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
    });
    
    // Adiciona o evento de scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Chama a função uma vez para animar os elementos que já estão visíveis
    setTimeout(animateOnScroll, 100);
    
    // Funcionalidade de filtragem para os desafios
    const filterButtons = document.querySelectorAll('.filter-btn');
    const challengeCards = document.querySelectorAll('.challenge-card');
    
    // Armazena os filtros ativos
    let activeFilters = {
        level: 'all',
        language: 'all'
    };
    
    // Função para filtrar os desafios
    const filterChallenges = () => {
        challengeCards.forEach(card => {
            const level = card.getAttribute('data-level');
            const language = card.getAttribute('data-language');
            
            // Verifica se o card deve ser exibido com base nos filtros ativos
            const levelMatch = activeFilters.level === 'all' || level === activeFilters.level;
            const languageMatch = activeFilters.language === 'all' || language === activeFilters.language;
            
            if (levelMatch && languageMatch) {
                card.style.display = 'flex';
                // Adiciona uma pequena animação de fade-in
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });
        
        // Verifica se há cards visíveis
        const visibleCards = document.querySelectorAll('.challenge-card[style="display: flex;"]');
        if (visibleCards.length === 0) {
            // Se não houver cards visíveis, mostra uma mensagem
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = '<p>Nenhum desafio encontrado com os filtros selecionados.</p>';
            
            // Verifica se já existe uma mensagem de "nenhum resultado"
            const existingNoResults = document.querySelector('.no-results');
            if (!existingNoResults) {
                document.querySelector('.challenges-grid').appendChild(noResults);
            }
        } else {
            // Remove a mensagem de "nenhum resultado" se existir
            const existingNoResults = document.querySelector('.no-results');
            if (existingNoResults) {
                existingNoResults.remove();
            }
        }
    };
    
    // Adiciona eventos de clique aos botões de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe ativa de todos os botões do mesmo grupo
            const filterGroup = button.closest('.filter-options');
            filterGroup.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Adiciona a classe ativa ao botão clicado
            button.classList.add('active');
            
            // Atualiza os filtros ativos
            const filterType = button.closest('.filter-group').querySelector('label').textContent.toLowerCase().replace(':', '');
            activeFilters[filterType] = button.getAttribute('data-filter');
            
            // Aplica os filtros
            filterChallenges();
        });
    });
    
    // Paginação dos desafios
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe ativa de todos os botões de paginação
            paginationButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Adiciona a classe ativa ao botão clicado
            button.classList.add('active');
            
            // Aqui você pode adicionar a lógica para carregar a página correspondente
            // Por enquanto, apenas simulamos a mudança de página
            if (!button.classList.contains('next')) {
                const pageNumber = button.textContent;
                console.log(`Carregando página ${pageNumber}...`);
                
                // Simula um carregamento
                const challengesGrid = document.querySelector('.challenges-grid');
                challengesGrid.style.opacity = '0.5';
                
                setTimeout(() => {
                    challengesGrid.style.opacity = '1';
                }, 500);
            }
        });
    });

    // Funções de gerenciamento de usuário
    updateUserInterface();

    // Chat Flutuante
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    // Respostas automáticas para perguntas comuns
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

    // Função para adicionar mensagem ao chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'system'}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Função para processar a mensagem do usuário
    function processUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = 'Desculpe, não entendi sua pergunta. Pode reformular ou escolher um dos tópicos: cursos, preços, pagamento, senha, xp, offline.';
        
        // Verifica se a mensagem contém alguma palavra-chave
        for (const [keyword, autoResponse] of Object.entries(autoResponses)) {
            if (lowerMessage.includes(keyword)) {
                response = autoResponse;
                break;
            }
        }
        
        // Simula um pequeno delay antes de responder
        setTimeout(() => {
            addMessage(response);
        }, 500);
    }

    // Toggle do chat
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.add('active');
    });

    // Fechar chat
    closeChat.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // Enviar mensagem
    function sendUserMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            processUserMessage(message);
        }
    }

    sendMessage.addEventListener('click', sendUserMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });
});

// Funções de gerenciamento de usuário
function updateUserInterface() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const userMenu = document.querySelector('.user-menu');
    const mobileUserInfo = document.querySelector('.mobile-user-info');
    const avatar = document.querySelector('.avatar');
    const levelBadge = document.querySelector('.level-badge');
    const xpBadge = document.querySelector('.xp-badge');

    if (user) {
        // Atualiza o avatar com as iniciais do nome
        const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
        avatar.textContent = initials;

        // Atualiza o nível e XP
        levelBadge.textContent = `Nível ${user.level}`;
        xpBadge.textContent = `${user.xp} XP`;

        // Mostra os elementos do usuário
        userMenu.style.display = 'flex';
        mobileUserInfo.style.display = 'flex';
    } else {
        // Esconde os elementos do usuário
        userMenu.style.display = 'none';
        mobileUserInfo.style.display = 'none';
    }
}

// Função para fazer logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
}