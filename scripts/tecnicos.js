function submitReport() {
    const issueDescription = document.getElementById('issue').value;
    const screenshot = document.getElementById('screenshot').files[0];

    if (!issueDescription) {
        alert("Por favor, descreva o problema antes de enviar.");
        return;
    }

    if (screenshot) {
        alert("Seu relato foi enviado com sucesso! Incluímos a captura de tela.");
    } else {
        alert("Seu relato foi enviado com sucesso! Não foi anexada nenhuma captura de tela.");
    }

    // Limpar o formulário após o envio
    document.getElementById('report-form').reset();
}