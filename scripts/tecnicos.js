document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const screenshotInput = document.getElementById('screenshot');
    const progressBar = document.getElementById('progress');

    screenshotInput.addEventListener('change', () => {
        const file = screenshotInput.files[0];
        if (file) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                progressBar.style.width = `${progress}%`;
                if (progress >= 100) {
                    clearInterval(interval);
                }
            }, 100);
        }
    });
});

function submitReport() {
    const category = document.getElementById('category').value;
    const issueDescription = document.getElementById('issue').value;
    const screenshot = document.getElementById('screenshot').files[0];

    if (!category) {
        alert("Por favor, selecione uma categoria.");
        return;
    }

    if (!issueDescription) {
        alert("Por favor, descreva o problema antes de enviar.");
        return;
    }

    if (screenshot) {
        alert(`Seu relato foi enviado com sucesso! Categoria: ${category}. Incluímos a captura de tela.`);
    } else {
        alert(`Seu relato foi enviado com sucesso! Categoria: ${category}. Não foi anexada nenhuma captura de tela.`);
    }

    // Limpar o formulário após o envio
    document.getElementById('report-form').reset();
    document.getElementById('progress').style.width = '0';
}