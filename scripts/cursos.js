// Função para inscrever em um curso
function enrollCourse(courseId) {
    // Verificar se o usuário está logado
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Por favor, faça login para se inscrever em um curso.');
        window.location.href = 'login.html';
        return;
    }

    // Simular inscrição no curso
    alert('Inscrição realizada com sucesso!');
    
    // Atualizar o botão do curso
    const courseButton = document.querySelector(`[data-course-id="${courseId}"]`);
    if (courseButton) {
        courseButton.textContent = 'Continuar';
        courseButton.classList.add('btn-success');
    }
}

// Função para atualizar o progresso do curso
function updateCourseProgress(courseId, progress) {
    const progressFill = document.querySelector(`[data-course-id="${courseId}"] .progress-fill`);
    const progressText = document.querySelector(`[data-course-id="${courseId}"] .progress-label span:last-child`);
    
    if (progressFill && progressText) {
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;
    }
}

// Função para inicializar os cursos
function initializeCourses() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach((card, index) => {
        // Adicionar ID único para cada curso
        const courseId = `course-${index + 1}`;
        card.setAttribute('data-course-id', courseId);
        
        // Adicionar evento de clique no botão
        const button = card.querySelector('.btn-sm');
        if (button) {
            button.setAttribute('data-course-id', courseId);
            button.addEventListener('click', () => enrollCourse(courseId));
        }
        
        // Simular progresso aleatório para demonstração
        const progress = Math.floor(Math.random() * 100);
        updateCourseProgress(courseId, progress);
    });
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initializeCourses);