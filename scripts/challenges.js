// Dados de exemplo para os desafios
const challenges = [
    {
        id: 1,
        title: "Soma de Dois Números",
        description: "Crie uma função que receba dois números e retorne sua soma.",
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
        title: "Fatorial",
        description: "Implemente uma função que calcule o fatorial de um número.",
        difficulty: "intermediario",
        language: "javascript",
        initialCode: "function fatorial(n) {\n    // Seu código aqui\n}",
        testCases: [
            { input: [5], expected: 120 },
            { input: [0], expected: 1 },
            { input: [3], expected: 6 }
        ]
    },
    {
        id: 3,
        title: "Palíndromo",
        description: "Verifique se uma string é um palíndromo (lê-se igual de trás para frente).",
        difficulty: "intermediario",
        language: "java",
        initialCode: "public class Solution {\n    public static boolean isPalindrome(String str) {\n        // Seu código aqui\n        return false;\n    }\n}",
        tests: [
            { input: ["ana"], expected: true },
            { input: ["casa"], expected: false },
            { input: ["radar"], expected: true }
        ]
    }
];

// Elementos do DOM
const challengesGrid = document.querySelector('.challenges-grid');
const searchInput = document.querySelector('.search-box input');
const difficultySelect = document.querySelector('#difficulty');
const languageSelect = document.querySelector('#language');
const modal = document.querySelector('.challenge-modal');
const closeModal = document.querySelector('.close-modal');
const codeEditor = document.querySelector('#codeEditor');
const runButton = document.querySelector('#runCode');
const resetButton = document.querySelector('#resetCode');
const outputDiv = document.querySelector('.code-output');

let currentChallenge = null;
let filteredChallenges = [...challenges];

// Função para renderizar os desafios
function renderChallenges(challengesToRender) {
    challengesGrid.innerHTML = '';
    challengesToRender.forEach(challenge => {
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
        challengesGrid.appendChild(card);
    });
}

// Função para abrir o modal
function openModal(challenge) {
    currentChallenge = challenge;
    modal.style.display = 'block';
    document.querySelector('.modal-content h2').textContent = challenge.title;
    document.querySelector('.modal-content p').textContent = challenge.description;
    codeEditor.value = challenge.initialCode;
    outputDiv.textContent = '';
}

// Função para fechar o modal
function closeModalHandler() {
    modal.style.display = 'none';
    currentChallenge = null;
}

// Função para executar o código
function runCode() {
    if (!currentChallenge) return;
    
    try {
        const code = codeEditor.value;
        const fn = new Function(code + `\nreturn { soma, fatorial }`)();
        const results = [];
        
        currentChallenge.testCases.forEach(test => {
            const result = fn[currentChallenge.title.toLowerCase().split(' ')[0]](...test.input);
            results.push({
                input: test.input,
                expected: test.expected,
                received: result,
                passed: result === test.expected
            });
        });
        
        displayResults(results);
    } catch (error) {
        outputDiv.textContent = `Erro: ${error.message}`;
    }
}

// Função para exibir os resultados
function displayResults(results) {
    const output = results.map(result => `
        Teste: ${result.input.join(', ')}
        Esperado: ${result.expected}
        Recebido: ${result.received}
        ${result.passed ? '✅ Passou' : '❌ Falhou'}
    `).join('\n\n');
    
    outputDiv.textContent = output;
}

// Função para resetar o código
function resetCode() {
    if (currentChallenge) {
        codeEditor.value = currentChallenge.initialCode;
        outputDiv.textContent = '';
    }
}

// Função para filtrar os desafios
function filterChallenges() {
    const searchTerm = searchInput.value.toLowerCase();
    const difficulty = difficultySelect.value;
    const language = languageSelect.value;
    
    const filtered = challenges.filter(challenge => {
        const matchesSearch = challenge.title.toLowerCase().includes(searchTerm) ||
                            challenge.description.toLowerCase().includes(searchTerm);
        const matchesDifficulty = difficulty === 'todos' || challenge.difficulty === difficulty;
        const matchesLanguage = language === 'todos' || challenge.language === language;
        
        return matchesSearch && matchesDifficulty && matchesLanguage;
    });
    
    renderChallenges(filtered);
}

// Event Listeners
closeModal.addEventListener('click', closeModalHandler);
window.addEventListener('click', (e) => {
    if (e.target === modal) closeModalHandler();
});
runButton.addEventListener('click', runCode);
resetButton.addEventListener('click', resetCode);
searchInput.addEventListener('input', filterChallenges);
difficultySelect.addEventListener('change', filterChallenges);
languageSelect.addEventListener('change', filterChallenges);

// Inicialização
renderChallenges(challenges); 