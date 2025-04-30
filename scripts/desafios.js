// Lista de desafios
const desafios = [
    {
        titulo: "1. Soma de dois números",
        descricao: "Escreva código que some 3 + 4 e exiba o resultado no console.",
        validacao: (log) => log.includes(7)
    },
    {
        titulo: "2. Números de 1 a 5",
        descricao: "Use um loop para exibir 1,2,3,4,5 no console.",
        validacao: (log) => JSON.stringify(log) === JSON.stringify([1, 2, 3, 4, 5])
    },
    // adicione mais aqui...
];

let indice = 0;
const tituloEl = document.getElementById("titulo-desafio");
const descEl = document.getElementById("descricao-desafio");
const areaCod = document.getElementById("codigo");
const btnExec = document.getElementById("btn-executar");
const saidaEl = document.getElementById("saida");

// Carrega o desafio atual
function carregarDesafio() {
    const d = desafios[indice];
    tituloEl.innerText = d.titulo;
    descEl.innerText = d.descricao;
    areaCod.value = "";
    saidaEl.innerText = "";
}

// Executa e valida
btnExec.addEventListener("click", () => {
    const userCode = areaCod.value;
    let log = [];
    const consoleBackup = console.log;
    console.log = (...args) => log.push(...args);

    try {
        eval(userCode);
        saidaEl.innerText = log.join("\n");
    } catch (e) {
        saidaEl.innerText = "Erro: " + e.message;
    }
    console.log = consoleBackup;

    if (desafios[indice].validacao(log)) {
        alert("✅ Parabéns! Desafio concluído.");
        indice = (indice + 1) % desafios.length;
        carregarDesafio();
    } else {
        alert("⚠️ Tente novamente.");
    }
});

// Inicia
window.onload = carregarDesafio;
