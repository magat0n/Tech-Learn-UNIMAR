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
        validacao: (saida, input) => {
            const [a, b] = input.split(' ').map(Number);
            return saida.trim() === String(a + b);
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
        validacao: (saida, input) => {
            const [a, b] = input.split(' ').map(Number);
            const media = ((a * 3.5) + (b * 7.5)) / 11;
            return Math.abs(parseFloat(saida) - media) < 0.00001;
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
        pontos: 100
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
        pontos: 100
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
        pontos: 100
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
        pontos: 100
    }
];

// Templates de código
const codeTemplates = {
    javascript: `// Seu código JavaScript aqui
function resolverDesafio(input) {
    // Implemente sua solução
    return input;
}

// Exemplo de uso
console.log(resolverDesafio("teste"));`,
    python: `# Seu código Python aqui
def resolver_desafio(entrada):
    # Implemente sua solução
    return entrada

# Exemplo de uso
print(resolver_desafio("teste"))`,
};

// Variáveis globais
let indice = 0;
let desafiosCompletos = new Set();
let pyodide;

// Elementos do DOM
const elementos = {
    titulo: document.getElementById("titulo-desafio"),
    descricao: document.getElementById("descricao-desafio"),
    exemplos: document.getElementById("exemplos-desafio"),
    input: document.getElementById("input"),
    saida: document.getElementById("saida"),
    btnExec: document.getElementById("btn-executar"),
    btnLimpar: document.getElementById("btn-limpar"),
    nivelDificuldade: document.getElementById("nivel-dificuldade"),
    pontosDesafio: document.getElementById("pontos-desafio"),
    listaDesafios: document.getElementById("lista-desafios"),
    codeExample: document.getElementById("code-example"),
    languageSelect: document.getElementById("code-language")
};

// Carrega a lista de desafios
function carregarListaDesafios() {
    elementos.listaDesafios.innerHTML = '';
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
        elementos.listaDesafios.appendChild(item);
    });
}

// Carrega o desafio atual
function carregarDesafio() {
    const d = desafios[indice];
    elementos.titulo.innerText = d.titulo;
    elementos.descricao.innerHTML = `
        <p><strong>Descrição:</strong> ${d.descricao}</p>
        <p><strong>Entrada:</strong> ${d.entrada}</p>
        <p><strong>Saída:</strong> ${d.saida}</p>
    `;
    elementos.exemplos.innerHTML = d.exemplos.map((ex, i) => `
        <div class="exemplo">
            <p><strong>Exemplo ${i + 1}</strong></p>
            <p><strong>Entrada:</strong><br><pre>${ex.entrada}</pre></p>
            <p><strong>Saída:</strong><br><pre>${ex.saida}</pre></p>
        </div>
    `).join('');
    
    elementos.nivelDificuldade.innerText = d.dificuldade;
    elementos.pontosDesafio.innerText = `${d.pontos} pontos`;
    elementos.input.value = d.exemplos[0].entrada;
    elementos.saida.innerText = '';
    
    carregarTemplateDesafio(elementos.languageSelect.value);
}

// Carrega o template de código
function carregarTemplateDesafio(linguagem) {
    elementos.codeExample.value = codeTemplates[linguagem];
    elementos.codeExample.className = `language-${linguagem}`;
}

// Inicializa o Pyodide
async function initPyodide() {
    try {
        pyodide = await loadPyodide();
    } catch (error) {
        console.error('Erro ao inicializar Pyodide:', error);
    }
}

// Event Listeners
elementos.btnLimpar.addEventListener('click', () => {
    carregarTemplateDesafio(elementos.languageSelect.value);
    elementos.saida.innerText = '';
});

elementos.languageSelect.addEventListener('change', (e) => {
    carregarTemplateDesafio(e.target.value);
});

document.querySelectorAll('.template-btn').forEach(button => {
    button.addEventListener('click', () => {
        const linguagem = button.dataset.language;
        elementos.languageSelect.value = linguagem;
        carregarTemplateDesafio(linguagem);
    });
});

// Executa o código
elementos.btnExec.addEventListener('click', async () => {
    const codigo = elementos.codeExample.value;
    const input = elementos.input.value;
    const linguagem = elementos.languageSelect.value;
    
    let resultado;
    if (linguagem === 'javascript') {
        resultado = await executarJavaScript(codigo, input);
    } else if (linguagem === 'python') {
        resultado = await executarPython(codigo, input);
    } else {
        elementos.saida.innerText = `A execução de código ${linguagem} ainda não é suportada.`;
        return;
    }

    if (resultado.erro) {
        elementos.saida.innerHTML = `<span style="color: var(--error);">${resultado.erro}</span>`;
        return;
    }

    elementos.saida.innerText = resultado.saida;

    // Validação do desafio
    const desafioAtual = desafios[indice];
    if (desafioAtual.validacao && desafioAtual.validacao(resultado.saida, input)) {
        desafiosCompletos.add(desafioAtual.id);
        alert("✅ Parabéns! Desafio concluído!");
        carregarListaDesafios();
        indice = (indice + 1) % desafios.length;
        carregarDesafio();
    } else {
        alert("⚠️ Tente novamente. A saída não corresponde ao esperado.");
    }
});

// Executa código JavaScript
async function executarJavaScript(codigo, input) {
    let log = [];
    const consoleBackup = console.log;
    console.log = (...args) => log.push(args.join(' '));

    try {
        // Verifica se o código contém palavras-chave do Python
        if (codigo.includes('def ') || codigo.includes('print(') || codigo.includes('import ')) {
            return { 
                saida: null, 
                erro: "Erro: Parece que você está tentando executar código Python no editor JavaScript. Por favor, selecione Python como linguagem." 
            };
        }

        const codigoCompleto = `
            const input = \`${input.replace(/`/g, '\\`')}\`;
            ${codigo}
        `;
        eval(codigoCompleto);
        return { saida: log.join('\n'), erro: null };
    } catch (e) {
        return { 
            saida: null, 
            erro: `Erro de sintaxe: ${e.message}` 
        };
    } finally {
        console.log = consoleBackup;
    }
}

// Executa código Python
async function executarPython(codigo, input) {
    try {
        // Verifica se o código contém palavras-chave do JavaScript
        if (codigo.includes('function ') || codigo.includes('console.log') || codigo.includes('const ') || codigo.includes('let ')) {
            return { 
                saida: null, 
                erro: "Erro: Parece que você está tentando executar código JavaScript no editor Python. Por favor, selecione JavaScript como linguagem." 
            };
        }

        if (!pyodide) {
            pyodide = await loadPyodide();
        }

        const codigoCompleto = `
import sys
import io

old_stdout = sys.stdout
new_stdout = io.StringIO()
sys.stdout = new_stdout

input_lines = """${input}""".split('\\n')
input_index = 0
def input():
    global input_index
    if input_index < len(input_lines):
        result = input_lines[input_index]
        input_index += 1
        return result
    return ""

try:
    ${codigo}
except Exception as e:
    print(f"Erro: {str(e)}")

sys.stdout = old_stdout
print(new_stdout.getvalue())
        `;
        
        await pyodide.runPythonAsync(codigoCompleto);
        const output = pyodide.globals.get('new_stdout').getvalue();
        return { saida: output.trim(), erro: null };
    } catch (e) {
        return { 
            saida: null, 
            erro: `Erro ao executar o código Python: ${e.toString()}` 
        };
    }
}

// Inicia a aplicação
async function iniciarAplicacao() {
    try {
        await initPyodide();
        carregarListaDesafios();
        carregarDesafio();
    } catch (error) {
        console.error('Erro ao iniciar a aplicação:', error);
    }
}

// Inicia quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', iniciarAplicacao);
