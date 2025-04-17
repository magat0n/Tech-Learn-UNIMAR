// Dados de exemplo para os desafios
const challenges = [
    {
        id: 1,
        title: "Soma de Dois Números",
        description: "Crie uma função que receba dois números e retorne a soma deles.",
        difficulty: "iniciante",
        language: "javascript",
        initialCode: "function soma(a, b) {\n    // Seu código aqui\n}",
        testCases: [
            { input: [1, 2], expected: 3 },
            { input: [5, 5], expected: 10 },
            { input: [-1, 1], expected: 0 }
        ]
    },
    {
        id: 2,
        title: "Palíndromo",
        description: "Verifique se uma string é um palíndromo (lê-se igual de trás para frente).",
        difficulty: "intermediario",
        language: "python",
        initialCode: "def is_palindrome(text):\n    # Seu código aqui\n    pass",
        testCases: [
            { input: ["ovo"], expected: true },
            { input: ["python"], expected: false },
            { input: ["A man a plan a canal Panama"], expected: true }
        ]
    }
];

// Elementos do DOM
const challengesGrid = document.querySelector('.challenges-grid');
const searchInput = document.querySelector('.search-box input');
const difficultySelect = document.querySelector('select[name="difficulty"]');
const languageSelect = document.querySelector('select[name="language"]');
const modal = document.querySelector('.challenge-modal');
const closeModalBtn = document.querySelector('.close-modal');
const codeEditor = document.getElementById('codeEditor');
const codeOutput = document.getElementById('codeOutput');
const resetBtn = document.querySelector('.btn.secondary');
const runBtn = document.querySelector('.btn.primary');

// Estado atual
let currentChallenge = null;

// Funções auxiliares
function createChallengeCard(challenge) {
    const card = document.createElement('div');
    card.className = 'challenge-card';
    card.innerHTML = `
        <h3>${challenge.title}</h3>
        <p>${challenge.description}</p>
        <div class="challenge-meta">
            <span class="difficulty ${challenge.difficulty}">${challenge.difficulty}</span>
            <span class="language">${challenge.language}</span>
        </div>
    `;
    
    card.addEventListener('click', () => openModal(challenge));
    return card;
}

function filterChallenges() {
    const searchTerm = searchInput.value.toLowerCase();
    const difficulty = difficultySelect.value;
    const language = languageSelect.value;

    const filteredChallenges = challenges.filter(challenge => {
        const matchesSearch = challenge.title.toLowerCase().includes(searchTerm) ||
                            challenge.description.toLowerCase().includes(searchTerm);
        const matchesDifficulty = difficulty === 'all' || challenge.difficulty === difficulty;
        const matchesLanguage = language === 'all' || challenge.language === language;
        
        return matchesSearch && matchesDifficulty && matchesLanguage;
    });

    displayChallenges(filteredChallenges);
}

function displayChallenges(challengesToShow) {
    challengesGrid.innerHTML = '';
    challengesToShow.forEach(challenge => {
        challengesGrid.appendChild(createChallengeCard(challenge));
    });
}

function openModal(challenge) {
    currentChallenge = challenge;
    modal.style.display = 'block';
    codeEditor.value = challenge.initialCode;
    codeOutput.textContent = '';
    
    // Atualiza o título e descrição no modal
    document.querySelector('.modal-content h2').textContent = challenge.title;
    document.querySelector('.modal-content p').textContent = challenge.description;
}

function closeModal() {
    modal.style.display = 'none';
    currentChallenge = null;
    codeEditor.value = '';
    codeOutput.textContent = '';
}

function resetCode() {
    if (currentChallenge) {
        codeEditor.value = currentChallenge.initialCode;
        codeOutput.textContent = '';
    }
}

function runCode() {
    if (!currentChallenge) return;

    const code = codeEditor.value;
    const results = [];

    try {
        // Cria uma função para executar o código
        const executeCode = new Function('return ' + code)();
        
        // Executa os testes
        currentChallenge.testCases.forEach(test => {
            const result = executeCode(...test.input);
            const passed = result === test.expected;
            results.push({
                input: test.input,
                expected: test.expected,
                received: result,
                passed
            });
        });

        // Exibe os resultados
        displayResults(results);
    } catch (error) {
        codeOutput.textContent = `Erro: ${error.message}`;
    }
}

function displayResults(results) {
    const output = results.map(result => {
        const status = result.passed ? '✅' : '❌';
        return `${status} Teste: ${JSON.stringify(result.input)}
        Esperado: ${result.expected}
        Recebido: ${result.received}
        `;
    }).join('\n');

    codeOutput.textContent = output;
}

// Event Listeners
searchInput.addEventListener('input', filterChallenges);
difficultySelect.addEventListener('change', filterChallenges);
languageSelect.addEventListener('change', filterChallenges);
closeModalBtn.addEventListener('click', closeModal);
resetBtn.addEventListener('click', resetCode);
runBtn.addEventListener('click', runCode);

// Fecha o modal ao clicar fora dele
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Inicialização
displayChallenges(challenges); 