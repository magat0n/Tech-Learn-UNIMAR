document.addEventListener('DOMContentLoaded', function() {
    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            item.classList.toggle('active');
        });
    });

    // Busca
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            alert('Por favor, digite algo para buscar.');
            return;
        }
        
        // Aqui você pode implementar a lógica de busca real
        // Por enquanto, vamos apenas mostrar uma mensagem
        alert(`Buscando por: ${searchTerm}\n\nEsta funcionalidade será implementada em breve!`);
    }
    
    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

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