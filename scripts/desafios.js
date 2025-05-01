// Lista de desafios
const desafios = [
    {
        id: 1,
        titulo: "Soma Simples",
        descricao: "Leia dois valores inteiros e exiba a soma deles.",
        entrada: "A entrada contém dois valores inteiros.",
        saida: "Imprima a soma dos valores.",
        exemplos: [
            {
                entrada: "10 30",
                saida: "40"
            },
            {
                entrada: "-30 10",
                saida: "-20"
            }
        ],
        dificuldade: "Iniciante",
        pontos: 100,
        validacao: (log, input) => {
            const [a, b] = input.split(' ').map(Number);
            return log[0] === (a + b).toString();
        }
    },
    {
        id: 2,
        titulo: "Média 1",
        descricao: "Leia dois valores de ponto flutuante e calcule a média ponderada, sendo que a primeira nota tem peso 3.5 e a segunda tem peso 7.5.",
        entrada: "A entrada contém dois valores de ponto flutuante.",
        saida: "Imprima a média com 5 casas decimais.",
        exemplos: [
            {
                entrada: "5.0 7.1",
                saida: "6.43182"
            },
            {
                entrada: "0.0 7.1",
                saida: "4.84091"
            }
        ],
        dificuldade: "Iniciante",
        pontos: 100,
        validacao: (log, input) => {
            const [a, b] = input.split(' ').map(Number);
            const media = ((a * 3.5) + (b * 7.5)) / 11;
            return Math.abs(parseFloat(log[0]) - media) < 0.00001;
        }
    },
    {
        id: 3,
        titulo: "Diferença",
        descricao: "Leia quatro valores inteiros A, B, C e D. Calcule e mostre a diferença do produto de A e B pelo produto de C e D.",
        entrada: "A entrada contém quatro valores inteiros.",
        saida: "Imprima a diferença.",
        exemplos: [
            {
                entrada: "5 6 7 8",
                saida: "-26"
            },
            {
                entrada: "0 0 7 8",
                saida: "-56"
            }
        ],
        dificuldade: "Iniciante",
        pontos: 100,
        validacao: (log, input) => {
            const [a, b, c, d] = input.split(' ').map(Number);
            return parseInt(log[0]) === (a * b - c * d);
        }
    },
    {
        id: 4,
        titulo: "Salário com Bônus",
        descricao: "Faça um programa que leia o nome de um vendedor, seu salário fixo e o total de vendas efetuadas por ele no mês. Sabendo que este vendedor ganha 15% de comissão sobre suas vendas efetuadas, calcular e imprimir o total a receber no final do mês.",
        entrada: "A entrada contém um texto (nome do vendedor), um valor de ponto flutuante (salário fixo) e outro valor de ponto flutuante (total de vendas).",
        saida: "Imprima o total que o funcionário deverá receber.",
        exemplos: [
            {
                entrada: "JOAO 500.00 1230.30",
                saida: "TOTAL = R$ 684.54"
            },
            {
                entrada: "PEDRO 700.00 0.00",
                saida: "TOTAL = R$ 700.00"
            }
        ],
        dificuldade: "Iniciante",
        pontos: 100,
        validacao: (log, input) => {
            const [nome, salario, vendas] = input.split(' ');
            const total = parseFloat(salario) + (parseFloat(vendas) * 0.15);
            return log[0] === `TOTAL = R$ ${total.toFixed(2)}`;
        }
    },
    {
        id: 5,
        titulo: "Consumo",
        descricao: "Calcule o consumo médio de um automóvel sendo fornecidos a distância total percorrida (em Km) e o total de combustível gasto (em litros).",
        entrada: "O arquivo de entrada contém dois valores: um valor inteiro X representando a distância total percorrida (em Km), e um valor real Y representando o total de combustível gasto, com um dígito após o ponto decimal.",
        saida: "Apresente o valor que representa o consumo médio do automóvel com 3 casas após a vírgula, seguido da mensagem 'km/l'.",
        exemplos: [
            {
                entrada: "500 35.0",
                saida: "14.286 km/l"
            },
            {
                entrada: "2254 124.4",
                saida: "18.119 km/l"
            }
        ],
        dificuldade: "Iniciante",
        pontos: 100,
        validacao: (log, input) => {
            const [distancia, combustivel] = input.split(' ').map(Number);
            const consumo = distancia / combustivel;
            return log[0] === `${consumo.toFixed(3)} km/l`;
        }
    },
    {
        id: 6,
        titulo: "Distância Entre Dois Pontos",
        descricao: "Leia os quatro valores correspondentes aos eixos x e y de dois pontos quaisquer no plano, p1(x1,y1) e p2(x2,y2) e calcule a distância entre eles, mostrando 4 casas decimais após a vírgula.",
        entrada: "O arquivo de entrada contém duas linhas de dados. A primeira linha contém dois valores de ponto flutuante: x1 y1 e a segunda linha contém dois valores de ponto flutuante x2 y2.",
        saida: "Calcule e imprima o valor da distância segundo a fórmula fornecida, com 4 casas decimais após a vírgula.",
        exemplos: [
            {
                entrada: "1.0 7.0\n5.0 9.0",
                saida: "4.4721"
            },
            {
                entrada: "-2.5 0.4\n12.1 7.3",
                saida: "16.1484"
            }
        ],
        dificuldade: "Iniciante",
        pontos: 100,
        validacao: (log, input) => {
            const [linha1, linha2] = input.split('\n');
            const [x1, y1] = linha1.split(' ').map(Number);
            const [x2, y2] = linha2.split(' ').map(Number);
            const distancia = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            return Math.abs(parseFloat(log[0]) - distancia) < 0.0001;
        }
    }
];

let indice = 0;
let editor;
let desafiosCompletos = new Set();
let pyodide;

// Templates de código para cada desafio
const templates = {
    javascript: {
        1: `// Soma Simples
const [a, b] = input.split(' ').map(Number);
console.log(a + b);`,
        2: `// Média 1
const [a, b] = input.split(' ').map(Number);
const media = ((a * 3.5) + (b * 7.5)) / 11;
console.log(media.toFixed(5));`,
        3: `// Diferença
const [a, b, c, d] = input.split(' ').map(Number);
console.log(a * b - c * d);`,
        4: `// Salário com Bônus
const [nome, salario, vendas] = input.split(' ');
const total = parseFloat(salario) + (parseFloat(vendas) * 0.15);
console.log(\`TOTAL = R$ \${total.toFixed(2)}\`);`,
        5: `// Consumo
const [distancia, combustivel] = input.split(' ').map(Number);
const consumo = distancia / combustivel;
console.log(\`\${consumo.toFixed(3)} km/l\`);`,
        6: `// Distância Entre Dois Pontos
const [linha1, linha2] = input.split('\\n');
const [x1, y1] = linha1.split(' ').map(Number);
const [x2, y2] = linha2.split(' ').map(Number);
const distancia = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
console.log(distancia.toFixed(4));`
    },
    python: {
        1: `# Soma Simples
a, b = map(int, input().split())
print(a + b)`,
        2: `# Média 1
a, b = map(float, input().split())
media = ((a * 3.5) + (b * 7.5)) / 11
print(f"{media:.5f}")`,
        3: `# Diferença
a, b, c, d = map(int, input().split())
print(a * b - c * d)`,
        4: `# Salário com Bônus
nome, salario, vendas = input().split()
total = float(salario) + (float(vendas) * 0.15)
print(f"TOTAL = R$ {total:.2f}")`,
        5: `# Consumo
distancia, combustivel = map(float, input().split())
consumo = distancia / combustivel
print(f"{consumo:.3f} km/l")`,
        6: `# Distância Entre Dois Pontos
x1, y1 = map(float, input().split())
x2, y2 = map(float, input().split())
distancia = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5
print(f"{distancia:.4f}")`
    }
};

// Inicializa o editor Monaco
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' }});
require(['vs/editor/editor.main'], function() {
    editor = monaco.editor.create(document.getElementById('editor'), {
        value: '// Digite seu código aqui\n',
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: true
    });
});

// Inicializa o Pyodide
async function initPyodide() {
    pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/npm/pyodide@0.23.4/"
    });
}

// Elementos da interface
const tituloEl = document.getElementById("titulo-desafio");
const descEl = document.getElementById("descricao-desafio");
const exemplosEl = document.getElementById("exemplos-desafio");
const inputEl = document.getElementById("input");
const saidaEl = document.getElementById("saida");
const btnExec = document.getElementById("btn-executar");
const btnLimpar = document.getElementById("btn-limpar");
const nivelDificuldadeEl = document.getElementById("nivel-dificuldade");
const pontosDesafioEl = document.getElementById("pontos-desafio");
const listaDesafiosEl = document.getElementById("lista-desafios");
const linguagemSelect = document.getElementById("linguagem-select");

// Carrega a lista de desafios na sidebar
function carregarListaDesafios() {
    listaDesafiosEl.innerHTML = '';
    desafios.forEach((desafio, index) => {
        const item = document.createElement('div');
        item.className = `desafio-item ${desafiosCompletos.has(desafio.id) ? 'completo' : ''}`;
        item.innerHTML = `
            <div>${desafio.id}. ${desafio.titulo}</div>
            <small>${desafio.dificuldade} - ${desafio.pontos} pontos</small>
        `;
        item.addEventListener('click', () => {
            indice = index;
            carregarDesafio();
        });
        listaDesafiosEl.appendChild(item);
    });
}

// Carrega o desafio atual
function carregarDesafio() {
    const d = desafios[indice];
    tituloEl.innerText = d.titulo;
    descEl.innerHTML = `
        <p><strong>Descrição:</strong> ${d.descricao}</p>
        <p><strong>Entrada:</strong> ${d.entrada}</p>
        <p><strong>Saída:</strong> ${d.saida}</p>
    `;
    exemplosEl.innerHTML = d.exemplos.map((ex, i) => `
        <div class="exemplo">
            <p><strong>Exemplo ${i + 1}</strong></p>
            <p><strong>Entrada:</strong><br><pre>${ex.entrada}</pre></p>
            <p><strong>Saída:</strong><br><pre>${ex.saida}</pre></p>
        </div>
    `).join('');
    nivelDificuldadeEl.innerText = d.dificuldade;
    pontosDesafioEl.innerText = `${d.pontos} pontos`;
    inputEl.value = d.exemplos[0].entrada;
    saidaEl.innerText = '';
    carregarTemplate(linguagemSelect.value);
}

// Limpa o editor
btnLimpar.addEventListener("click", () => {
    carregarTemplate(linguagemSelect.value);
    saidaEl.innerText = '';
});

// Muda a linguagem do editor
linguagemSelect.addEventListener("change", () => {
    const linguagem = linguagemSelect.value;
    monaco.editor.setModelLanguage(editor.getModel(), linguagem);
    carregarTemplate(linguagem);
});

// Carrega o template de código
function carregarTemplate(linguagem) {
    const template = templates[linguagem][desafios[indice].id];
    if (template) {
        editor.setValue(template);
    }
}

// Adiciona eventos para os botões de template
document.getElementById('btn-template-js').addEventListener('click', () => {
    carregarTemplate('javascript');
    linguagemSelect.value = 'javascript';
    monaco.editor.setModelLanguage(editor.getModel(), 'javascript');
});

document.getElementById('btn-template-py').addEventListener('click', () => {
    carregarTemplate('python');
    linguagemSelect.value = 'python';
    monaco.editor.setModelLanguage(editor.getModel(), 'python');
});

// Executa o código JavaScript
async function executarJavaScript(codigo, input) {
    let log = [];
    const consoleBackup = console.log;
    console.log = (...args) => log.push(args.join(' '));

    try {
        // Adiciona o código para ler a entrada
        const codigoCompleto = `
            const input = "${input}";
            ${codigo}
        `;
        eval(codigoCompleto);
        return { saida: log.join('\n'), erro: null };
    } catch (e) {
        return { saida: null, erro: e.message };
    } finally {
        console.log = consoleBackup;
    }
}

// Executa o código Python
async function executarPython(codigo, input) {
    try {
        // Adiciona o código para ler a entrada
        const codigoCompleto = `
import sys
import io

# Redireciona stdout para capturar a saída
old_stdout = sys.stdout
new_stdout = io.StringIO()
sys.stdout = new_stdout

# Simula a entrada
input_lines = """${input}""".split('\\n')
def input():
    if input_lines:
        return input_lines.pop(0)
    return ""

${codigo}

# Restaura stdout e retorna a saída
sys.stdout = old_stdout
print(new_stdout.getvalue())
        `;
        
        // Executa o código
        const resultado = await pyodide.runPythonAsync(codigoCompleto);
        return { saida: resultado, erro: null };
    } catch (e) {
        return { saida: null, erro: e.message };
    }
}

// Executa e valida o código
btnExec.addEventListener("click", async () => {
    const userCode = editor.getValue();
    const input = inputEl.value;
    const linguagem = linguagemSelect.value;
    
    let resultado;
    if (linguagem === 'javascript') {
        resultado = await executarJavaScript(userCode, input);
    } else if (linguagem === 'python') {
        resultado = await executarPython(userCode, input);
    }

    if (resultado.erro) {
        saidaEl.innerText = `Erro: ${resultado.erro}`;
        return;
    }

    saidaEl.innerText = resultado.saida;

    if (desafios[indice].validacao(resultado.saida.split('\n'), input)) {
        desafiosCompletos.add(desafios[indice].id);
        alert("✅ Parabéns! Desafio concluído.");
        carregarListaDesafios();
        indice = (indice + 1) % desafios.length;
        carregarDesafio();
    } else {
        alert("⚠️ Tente novamente.");
    }
});

// Inicia
window.onload = async () => {
    await initPyodide();
    carregarListaDesafios();
    carregarDesafio();
};
