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
        const elements = document.querySelectorAll('.feature-card, .course-card, .section-header, .cta-content');
        
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
    document.querySelectorAll('.feature-card, .course-card, .section-header:not(.hero *), .cta-content').forEach(element => {
        element.style.transform = 'translateY(20px)';
        element.style.opacity = '0';
        element.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
    });
    
    // Adiciona o evento de scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Chama a função uma vez para animar os elementos que já estão visíveis
    setTimeout(animateOnScroll, 100);
});