// Dados de exemplo para os desafios
const challenges = [
  {
    id: 1,
    title: 'Soma de Dois Números',
    description: 'Crie uma função que receba dois números e retorne a soma deles.',
    level: 'Iniciante',
    language: 'JavaScript',
    instructions: `
      <h3>Instruções</h3>
      <p>Neste desafio, você deve criar uma função chamada <code>soma</code> que recebe dois parâmetros numéricos e retorna a soma deles.</p>
      
      <h3>Exemplo:</h3>
      <div class="code-example">
        <pre><code>soma(2, 3) // deve retornar 5
soma(-1, 1) // deve retornar 0
soma(10, 20) // deve retornar 30</code></pre>
      </div>
      
      <h3>Dicas:</h3>
      <ul>
        <li>Use o operador de adição (+)</li>
        <li>Lembre-se de retornar o resultado</li>
        <li>Teste sua função com diferentes valores</li>
      </ul>
    `,
    initialCode: `function soma(a, b) {
  // Seu código aqui
  
}`,
    solution: `function soma(a, b) {
  return a + b;
}`,
    tests: [
      {
        name: 'Teste 1: Soma de números positivos',
        test: (code) => {
          try {
            const fn = new Function(code + '\nreturn soma(2, 3);');
            return fn() === 5;
          } catch (e) {
            return false;
          }
        }
      },
      {
        name: 'Teste 2: Soma de números negativos',
        test: (code) => {
          try {
            const fn = new Function(code + '\nreturn soma(-1, -1);');
            return fn() === -2;
          } catch (e) {
            return false;
          }
        }
      },
      {
        name: 'Teste 3: Soma de zero',
        test: (code) => {
          try {
            const fn = new Function(code + '\nreturn soma(0, 0);');
            return fn() === 0;
          } catch (e) {
            return false;
          }
        }
      }
    ]
  },
  {
    id: 2,
    title: 'Palíndromo',
    description: 'Verifique se uma string é um palíndromo (lê-se igual de trás para frente).',
    level: 'Intermediário',
    language: 'JavaScript',
    instructions: `
      <h3>Instruções</h3>
      <p>Crie uma função chamada <code>ehPalindromo</code> que recebe uma string e retorna <code>true</code> se for um palíndromo, ou <code>false</code> caso contrário.</p>
      
      <h3>Exemplo:</h3>
      <div class="code-example">
        <pre><code>ehPalindromo("arara") // deve retornar true
ehPalindromo("javascript") // deve retornar false
ehPalindromo("A man a plan a canal Panama") // deve retornar true</code></pre>
      </div>
      
      <h3>Dicas:</h3>
      <ul>
        <li>Ignore espaços e diferenças de maiúsculas/minúsculas</li>
        <li>Você pode usar métodos de string como toLowerCase() e replace()</li>
        <li>Compare a string original com sua versão invertida</li>
      </ul>
    `,
    initialCode: `function ehPalindromo(str) {
  // Seu código aqui
  
}`,
    solution: `function ehPalindromo(str) {
  // Remove espaços e converte para minúsculas
  const limpaStr = str.toLowerCase().replace(/\\s/g, '');
  
  // Inverte a string e compara
  return limpaStr === limpaStr.split('').reverse().join('');
}`,
    tests: [
      {
        name: 'Teste 1: Palíndromo simples',
        test: (code) => {
          try {
            const fn = new Function(code + '\nreturn ehPalindromo("arara");');
            return fn() === true;
          } catch (e) {
            return false;
          }
        }
      },
      {
        name: 'Teste 2: Não é palíndromo',
        test: (code) => {
          try {
            const fn = new Function(code + '\nreturn ehPalindromo("javascript");');
            return fn() === false;
          } catch (e) {
            return false;
          }
        }
      },
      {
        name: 'Teste 3: Palíndromo com espaços',
        test: (code) => {
          try {
            const fn = new Function(code + '\nreturn ehPalindromo("A man a plan a canal Panama");');
            return fn() === true;
          } catch (e) {
            return false;
          }
        }
      }
    ]
  }
];

// Elementos do DOM
const challengesGrid = document.querySelector('.challenges-grid');
const searchInput = document.querySelector('#searchInput');
const levelFilter = document.querySelector('#levelFilter');
const languageFilter = document.querySelector('#languageFilter');
const challengeModal = document.querySelector('.challenge-modal');
const closeModalBtn = document.querySelector('.close-modal');
const challengeTabs = document.querySelectorAll('.challenge-tab');
const tabPanes = document.querySelectorAll('.tab-pane');
const codeEditor = document.querySelector('#codeEditor');
const runCodeBtn = document.querySelector('#runCode');
const clearOutputBtn = document.querySelector('#clearOutput');
const codeOutput = document.querySelector('#codeOutput');
const testResults = document.querySelector('.test-results');

// Estado atual
let currentChallenge = null;
let filteredChallenges = [...challenges];

// Funções auxiliares
function createChallengeCard(challenge) {
  const card = document.createElement('div');
  card.className = 'challenge-card';
  card.innerHTML = `
    <div class="challenge-card-header">
      <h3>${challenge.title}</h3>
    </div>
    <div class="challenge-card-body">
      <div class="challenge-info">
        <span><i class="fas fa-code"></i> ${challenge.language}</span>
        <span><i class="fas fa-star"></i> ${challenge.points} pontos</span>
      </div>
      <p class="challenge-description">${challenge.description}</p>
    </div>
    <div class="challenge-card-footer">
      <span class="challenge-difficulty difficulty-${challenge.difficulty}">
        ${challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
      </span>
      <button class="btn btn-primary" onclick="openChallenge(${challenge.id})">
        Iniciar Desafio
      </button>
    </div>
  `;
  return card;
}

function renderChallenges() {
  challengesGrid.innerHTML = '';
  filteredChallenges.forEach(challenge => {
    challengesGrid.appendChild(createChallengeCard(challenge));
  });
}

function filterChallenges() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedLevel = levelFilter.value;
  const selectedLanguage = languageFilter.value;

  filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm) ||
                        challenge.description.toLowerCase().includes(searchTerm);
    const matchesLevel = selectedLevel === 'todos' || challenge.difficulty === selectedLevel;
    const matchesLanguage = selectedLanguage === 'todos' || challenge.language === selectedLanguage;

    return matchesSearch && matchesLevel && matchesLanguage;
  });

  renderChallenges();
}

function openChallenge(challengeId) {
  currentChallenge = challenges.find(c => c.id === challengeId);
  if (!currentChallenge) return;

  // Atualizar conteúdo do modal
  document.querySelector('.challenge-modal-header h2').textContent = currentChallenge.title;
  
  // Atualizar conteúdo das abas
  document.querySelector('#instructionsContent').innerHTML = `
    <h3>Descrição</h3>
    <p>${currentChallenge.description}</p>
    <h3>Requisitos</h3>
    <ul>
      <li>Implemente a solução usando ${currentChallenge.language}</li>
      <li>Siga as boas práticas de programação</li>
      <li>Seu código deve passar em todos os testes</li>
    </ul>
  `;

  // Configurar editor
  codeEditor.value = getInitialCode(currentChallenge.language);
  
  // Mostrar modal
  challengeModal.classList.add('active');
}

function closeChallenge() {
  challengeModal.classList.remove('active');
  currentChallenge = null;
}

function switchTab(tabId) {
  // Atualizar tabs
  challengeTabs.forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.tab === tabId) {
      tab.classList.add('active');
    }
  });

  // Atualizar conteúdo
  tabPanes.forEach(pane => {
    pane.classList.remove('active');
    if (pane.id === `${tabId}Content`) {
      pane.classList.add('active');
    }
  });
}

function getInitialCode(language) {
  const templates = {
    'JavaScript': `// Seu código aqui
function solution() {
    // Implemente sua solução
}`,
    'Python': `# Seu código aqui
def solution():
    # Implemente sua solução
    pass`,
    'Node.js': `// Seu código aqui
function solution() {
    // Implemente sua solução
}`
  };
  return templates[language] || '';
}

function runCode() {
  if (!currentChallenge) return;

  try {
    // Capturar saída do console
    const originalConsoleLog = console.log;
    let output = '';
    console.log = (...args) => {
      output += args.join(' ') + '\n';
    };

    // Executar código
    const code = codeEditor.value;
    eval(code);

    // Restaurar console.log
    console.log = originalConsoleLog;

    // Mostrar saída
    codeOutput.textContent = output || 'Nenhuma saída';
  } catch (error) {
    codeOutput.textContent = `Erro: ${error.message}`;
  }
}

function clearOutput() {
  codeOutput.textContent = '';
}

// Event Listeners
searchInput.addEventListener('input', filterChallenges);
levelFilter.addEventListener('change', filterChallenges);
languageFilter.addEventListener('change', filterChallenges);
closeModalBtn.addEventListener('click', closeChallenge);
challengeTabs.forEach(tab => {
  tab.addEventListener('click', () => switchTab(tab.dataset.tab));
});
runCodeBtn.addEventListener('click', runCode);
clearOutputBtn.addEventListener('click', clearOutput);

// Inicialização
renderChallenges(); 