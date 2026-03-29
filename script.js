// Configuração do Firebase do Usuário
const firebaseConfig = {
    apiKey: "AIzaSyAjH1kVPCZHqZRzu9AszDKiD9csdEmSz_c",
    authDomain: "chat-app-c974a.firebaseapp.com",
    databaseURL: "https://chat-app-c974a-default-rtdb.firebaseio.com",
    projectId: "chat-app-c974a",
    storageBucket: "chat-app-c974a.appspot.com",
    appId: "1:753329556773:web:4511da13d5355efca81ecc"
};

// Inicialização
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let usuario = { nome: "", dataNasc: "", genero: "", bio: "" };

// Função para idade
const calcIdade = (d) => {
    const hoje = new Date();
    const n = new Date(d);
    let i = hoje.getFullYear() - n.getFullYear();
    if (hoje.getMonth() < n.getMonth() || (hoje.getMonth() === n.getMonth() && hoje.getDate() < n.getDate())) i--;
    return i;
};

// Lógica de Registro
document.getElementById('profileForm').onsubmit = (e) => {
    e.preventDefault();
    const dataVal = document.getElementById('regData').value;
    
    if (calcIdade(dataVal) < 10) {
        alert("Acesso permitido apenas para maiores de 10 anos.");
        return;
    }

    usuario = {
        nome: document.getElementById('regNome').value,
        dataNasc: new Date(dataVal).toLocaleDateString('pt-BR'),
        genero: document.getElementById('regGenero').value,
        bio: document.getElementById('regBio').value
    };

    document.getElementById('registerScreen').classList.remove('active');
    document.getElementById('appScreen').classList.add('active');
    lucide.createIcons();
};

const panel = document.getElementById('sidePanel');
const content = document.getElementById('panelContent');

function abrir(id, callback) {
    const template = document.getElementById(id);
    content.innerHTML = template.innerHTML;
    if(callback) callback();
    panel.classList.add('open');
    lucide.createIcons();
}

document.getElementById('closePanel').onclick = () => panel.classList.remove('open');

// Abrir Perfil
document.getElementById('openProfile').onclick = () => {
    abrir('profileTemplate', () => {
        document.getElementById('pNome').innerText = usuario.nome;
        document.getElementById('pData').innerText = usuario.dataNasc;
        document.getElementById('pGenero').innerText = usuario.genero;
        document.getElementById('pBio').innerText = usuario.bio;
    });
};

// Abrir Chat (Realtime)
document.getElementById('openChat').onclick = () => {
    document.querySelector('.notification-badge').style.display = 'none';
    abrir('chatTemplate', () => {
        const btn = document.getElementById('sendMsg');
        const input = document.getElementById('chatInput');
        const box = document.getElementById('chatMessages');

        btn.onclick = () => {
            const texto = input.value.trim();
            if(!texto) return;
            database.ref('mensagens').push({
                user: usuario.nome,
                text: texto,
                timestamp: Date.now()
            });
            input.value = '';
        };

        // Escutar mensagens novas
        database.ref('mensagens').limitToLast(50).on('child_added', (snapshot) => {
            const data = snapshot.val();
            const div = document.createElement('div');
            div.className = 'msg-bubble';
            div.innerHTML = `<b>${data.user}</b>${data.text}`;
            box.appendChild(div);
            box.scrollTop = box.scrollHeight;
        });
    });
};

// Inicializa ícones na carga inicial
lucide.createIcons();

