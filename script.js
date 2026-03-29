document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('btnEnviar');
    
    // Animação de Loading no botão
    btn.innerHTML = `<span>Processando...</span>`;
    btn.style.opacity = "0.7";
    btn.style.pointerEvents = "none";

    setTimeout(() => {
        // Efeito de Sucesso
        btn.style.background = "#10b981";
        btn.innerHTML = `<span>Sucesso!</span> <i data-lucide="check"></i>`;
        lucide.createIcons(); // Recarrega o ícone de check

        // Captura os dados
        const dados = {
            nome: document.getElementById('nome').value,
            data: document.getElementById('data').value,
            genero: document.getElementById('genero').value,
            bio: document.getElementById('bio').value
        };
        
        console.table(dados);

        // Reset elegante
        setTimeout(() => {
            location.reload(); 
        }, 2000);
    }, 1500);
});
