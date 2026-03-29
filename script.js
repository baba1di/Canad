let usuario = { nome: "", dataNasc: "", genero: "", bio: "" };

function calcularIdade(dataStr) {
    const hoje = new Date();
    const nasc = new Date(dataStr);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    if (hoje.getMonth() < nasc.getMonth() || (hoje.getMonth() === nasc.getMonth() && hoje.getDate() < nasc.getDate())) idade--;
    return idade;
}

document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const dataVal = document.getElementById('regData').value;
    
    if (calcularIdade(dataVal) < 10) {
        alert("❌ Acesso negado! Você precisa ter mais de 10 anos.");
        return;
    }

    usuario.nome = document.getElementById('regNome').value;
    usuario.dataNasc = new Date(dataVal).toLocaleDateString('pt-BR');
    usuario.genero = document.getElementById('regGenero').value;
    usuario.bio = document.getElementById('regBio').value;

    document.getElementById('registerScreen').classList.remove('active');
    document.getElementById('appScreen').classList.add('active');
});

const sidePanel = document.getElementById('sidePanel');
const panelContent = document.getElementById('panelContent');

function abrirPainel(templateId, setupFn) {
    const temp = document.getElementById(templateId);
    panelContent.innerHTML = '';
    panelContent.appendChild(temp.content.cloneNode(true));
    if(setupFn) setupFn();
    sidePanel.classList.add('open');
    lucide.createIcons();
}

document.getElementById('closePanel').onclick = () => sidePanel.classList.remove('open');

document.getElementById('openProfile').onclick = () => {
    abrirPainel('profileTemplate', () => {
        document.getElementById('pNome').innerText = usuario.nome;
        document.getElementById('pData').innerText = usuario.dataNasc;
        document.getElementById('pGenero').innerText = usuario.genero;
        document.getElementById('pBio').innerText = usuario.bio;
    });
};

document.getElementById('openChat').onclick = () => {
    document.querySelector('.notification-badge').style.display = 'none';
    abrirPainel('chatTemplate', () => {
        const btn = document.getElementById('sendMsg');
        const input = document.getElementById('chatInput');
        const box = document.getElementById('chatMessages');

        btn.onclick = () => {
            if(!input.value) return;
            const msg = document.createElement('div');
            msg.className = 'msg-bubble';
            // Formato Nome: Mensagem
            msg.innerHTML = `<b>${usuario.nome}:</b> ${input.value}`;
            box.appendChild(msg);
            input.value = '';
            box.scrollTop = box.scrollHeight;
        };
    });
};

