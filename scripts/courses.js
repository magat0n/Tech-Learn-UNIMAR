// Array de cursos disponíveis
const courses = [
    {
        id: 1,
        title: "Introdução ao Desenvolvimento Web",
        description: "Aprenda os fundamentos do desenvolvimento web com HTML, CSS e JavaScript",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Web Development",
        level: "Iniciante",
        duration: "40 horas",
        rating: 4.8,
        students: 1200,
        price: "Gratuito",
        instructor: "João Silva",
        topics: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
        progress: 0
    },
    {
        id: 2,
        title: "Python para Data Science",
        description: "Domine Python e suas bibliotecas para análise de dados e machine learning",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Data Science",
        level: "Intermediário",
        duration: "60 horas",
        rating: 4.9,
        students: 850,
        price: "R$ 199,90",
        instructor: "Maria Santos",
        topics: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
        progress: 0
    },
    {
        id: 3,
        title: "React.js Avançado",
        description: "Aprenda React.js do zero ao avançado com projetos práticos",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Frontend",
        level: "Avançado",
        duration: "50 horas",
        rating: 4.7,
        students: 1500,
        price: "R$ 249,90",
        instructor: "Pedro Oliveira",
        topics: ["React", "Redux", "Hooks", "Context API", "Testing"],
        progress: 0
    },
    {
        id: 4,
        title: "Node.js e APIs REST",
        description: "Desenvolva APIs RESTful com Node.js e Express",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Backend",
        level: "Intermediário",
        duration: "45 horas",
        rating: 4.6,
        students: 980,
        price: "R$ 179,90",
        instructor: "Ana Costa",
        topics: ["Node.js", "Express", "MongoDB", "JWT", "API Design"],
        progress: 0
    }
];

// Função para renderizar os cursos
function renderCourses() {
    const coursesContainer = document.querySelector('.courses-grid');
    if (!coursesContainer) return;

    coursesContainer.innerHTML = courses.map(course => `
        <div class="course-card">
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
                <div class="course-badges">
                    <span class="new-badge">${course.category}</span>
                </div>
            </div>
            <div class="course-content">
                <div class="course-header">
                    <span class="course-category">${course.category}</span>
                    <span class="course-rating">⭐ ${course.rating}</span>
                </div>
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="course-stats">
                    <div class="stat">
                        <span class="detail-icon">👤</span>
                        <span>${course.students} alunos</span>
                    </div>
                    <div class="stat">
                        <span class="detail-icon">⏱️</span>
                        <span>${course.duration}</span>
                    </div>
                    <div class="stat">
                        <span class="detail-icon">📚</span>
                        <span>${course.level}</span>
                    </div>
                </div>
                <div class="course-footer">
                    <span class="level-tag ${course.level.toLowerCase()}">${course.level}</span>
                    <button class="btn btn-sm" onclick="enrollCourse(${course.id})">
                        ${course.price === 'Gratuito' ? 'Começar Agora' : 'Comprar'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Função para matricular em um curso
function enrollCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    // Aqui você pode adicionar a lógica de matrícula
    alert(`Você foi matriculado no curso: ${course.title}`);
    
    // Atualiza o progresso do curso
    course.progress = 10;
    
    // Atualiza a interface
    renderCourses();
}

// Inicializa os cursos quando a página carregar
document.addEventListener('DOMContentLoaded', renderCourses); 