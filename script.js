// 1. Configuração do seu Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAjH1kVPCZHqZRzu9AszDKiD9csdEmSz_c",
    authDomain: "chat-app-c974a.firebaseapp.com",
    databaseURL: "https://chat-app-c974a-default-rtdb.firebaseio.com",
    projectId: "chat-app-c974a",
    storageBucket: "chat-app-c974a.appspot.com",
    appId: "1:753329556773:web:4511da13d5355efca81ecc"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let usuario = { nome: "", dataNasc: "", genero: "", bio: "" };

// Função Calcular Idade
function calcIdade(d) {
    const hoje = new Date();
    const n = new Date(d);
    let i = hoje.getFullYear() - n.getFullYear();
    if (hoje.getMonth() < n.getMonth() || (hoje.getMonth() === n.getMonth() && hoje.getDate() < n.getDate())) i--;
    return i;
}

// Registro
document.getElementById('profileForm').onsubmit = (e) => {
    e.preventDefault();
    const dataVal = document.getElementById('regData').value;
    if (calcIdade(dataVal) < 10) return alert("Menores de 10 não entram!");

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

function abrir(id, fn) {
    content.innerHTML = document.getElementById(id).innerHTML;
    if(fn) fn();
    panel.classList.add('open');
    lucide.createIcons();
}

document.getElementById('closePanel').onclick = () => panel.classList.remove('open');

// Perfil
document.getElementById('openProfile').onclick = () => {
    abrir('profileTemplate', () => {
        document.getElementById('pNome').innerText = usuario.nome;
        document.getElementById('pData').innerText = usuario.dataNasc;
        document.getElementById('pGenero').innerText = usuario.genero;
        document.getElementById('pBio').innerText = usuario.bio;
    });
};

// CHAT FUNCIONANDO COM FIREBASE
document.getElementById('openChat').onclick = () => {
    document.querySelector('.notification-badge').style.display = 'none';
    abrir('chatTemplate', () => {
        const btn = document.getElementById('sendMsg');
        const input = document.getElementById('chatInput');
        const box = document.getElementById('chatMessages');

        // Enviar para o Firebase
        btn.onclick = () => {
            if(!input.value.trim()) return;
            database.ref('mensagens').push({
                user: usuario.nome,
                text: input.value,
                time: Date.now()
            });
            input.value = '';
        };

        // Ouvir o Firebase em tempo real
        database.ref('mensagens').limitToLast(20).on('child_added', (snapshot) => {
            const data = snapshot.val();
            const div = document.createElement('div');
            div.className = 'msg-bubble';
            div.innerHTML = `<b>${data.user}</b>${data.text}`;
            box.appendChild(div);
            box.scrollTop = box.scrollHeight;
        });
    });
};

lucide.createIcons();
