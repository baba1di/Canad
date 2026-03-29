// --- DADOS DO USUÁRIO (Memória) ---
let usuario = {
    nome: "",
    dataNasc: "",
    genero: "",
    bio: ""
};

// --- FUNÇÕES DE UTILIDADE ---
function calcularIdade(dataStr) {
    const hoje = new Date();
    const nasc = new Date(dataStr);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) { idade--; }
    return idade;
}

// --- LOGICA DE REGISTRO e TRAVA DE IDADE ---
document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const dataNascValue = document.getElementById('regData').value;
    const idade = calcularIdade(dataNascValue);
    
    // Verificação de Idade (Menos de 10 anos não entra)
    if (idade < 10) {
        alert("⚠️ Desculpe, você precisa ter pelo menos 10 anos para entrar.");
        return; // Para a execução aqui
    }

    // Salva os dados se for maior de 10
    usuario.nome = document.getElementById('regNome').value;
    usuario.dataNasc = new Date(dataNascValue).toLocaleDateString('pt-BR');
    usuario.genero = document.getElementById('regGenero').value;
    usuario.bio = document.getElementById('regBio').value;

    // Feedback visual no botão
    const btn = document.getElementById('btnRegister');
    btn.innerHTML = `<span>Carregando...</span>`;
    btn.style.opacity = '0.7';

    // Transição de Tela após 1.5s
    setTimeout(() => {
        document.getElementById('registerScreen').classList.remove('active');
        document.getElementById('appScreen').classList.add('active');
        lucide.createIcons(); // Recarrega ícones na nova tela
    }, 1500);
});


// --- MANIPULAÇÃO DO PAINEL LATERAL (SETTINGS & CHAT) ---
const sidePanel = document.getElementById('sidePanel');
const panelContent = document.getElementById('panelContent');

function abrirPainel(templateId, callback) {
    // Pega o conteúdo do template HTML
    const template = document.getElementById(templateId);
    const clone = template.content.cloneNode(true);
    
    panelContent.innerHTML = ''; // Limpa o painel
    panelContent.appendChild(clone); // Coloca o conteúdo novo
    lucide.createIcons(); // Ativa os ícones
    
    if (callback) callback(); // Executa lógica específica (como setup do chat)
    
    sidePanel.classList.add('open');
}

document.getElementById('closePanel').addEventListener('click', () => {
    sidePanel.classList.remove('open');
});


// --- CLIQUE EM CONFIGURAÇÕES (Perfil) ---
document.getElementById('openProfile').addEventListener('click', () => {
    abrirPainel('profileTemplate', () => {
        // Preenche os dados salvos nos campos do template
        document.getElementById('pNome').innerText = usuario.nome;
        document.getElementById('pData').innerText = usuario.dataNasc;
        document.getElementById('pGenero').innerText = usuario.genero;
        document.getElementById('pBio').innerText = usuario.bio;
    });
});


// --- CLIQUE EM CHAT ---
document.getElementById('openChat').addEventListener('click', () => {
    // Remove bolinha de notificação se houver
    document.querySelector('.notification-badge').style.display = 'none';
    
    abrirPainel('chatTemplate', setupChatFunctions);
});


// --- LÓGICA DO CHAT (Mandar MSG) ---
function setupChatFunctions() {
    const input = document.getElementById('chatInput');
    const btnSend = document.getElementById('sendMsg');
    const messagesCont = document.getElementById('chatMessages');

    function enviarMensagem() {
        const texto = input.value.trim();
        if (texto === "") return;

        // Cria a bolha da mensagem
        const msgBubble = document.createElement('div');
        msgBubble.classList.add('msg-bubble', 'user');
        
        // FORMATO SOLICITADO -> Nome: Msg
        msgBubble.innerHTML = `<strong>${usuario.nome}:</strong> ${texto}`;

        messagesCont.appendChild(msgBubble);
        
        // Limpa input e faz scroll para baixo
        input.value = '';
        messagesCont.scrollTop = messagesCont.scrollHeight;
        
        input.focus();
    }

    // Clique no botão ou Enter
    btnSend.addEventListener('click', enviarMensagem);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') enviarMensagem();
    });
}
