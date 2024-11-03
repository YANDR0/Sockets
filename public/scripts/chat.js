const socket = io('/');

const roomId = window.location.href.split('/').pop()
const username = sessionStorage.getItem("username");
const messageInput = document.getElementById('message');
const home = "http://localhost:3000/home";
const chatBox = document.getElementById("chatBox");

if(!username){
    window.location.replace(home);
    alert("You need a username")
}

function updateChat(data){
    const bubble = document.createElement("div");
    const newClass = (data.type == 0)? "right" : (data.type == 1)? "left": "center";
    bubble.className += "bubble " + newClass;
    bubble.textContent = data.message;

    //FALTAN LOS DATOS Y ESTILO PARA CENTRAR Y ESO
    if(data.type != 2){
        const info = document.createElement("div");
        info.textContent = data.user;
        bubble.appendChild = info;
    }

    chatBox.appendChild(bubble)
}

function generateMessage(msg, type){
    data = { 
        message: msg, 
        date: new Date(),
        user: username,
        room: roomId,
        type: type
    };

    updateChat(data);
    if(type != 2) data = {...data, type: 1}
    socket.emit('sendMessage', data);
}

socket.emit('joinRoom', roomId)
generateMessage(username + " joined!", 2)

socket.on('getMessage', (data) => {
    updateChat(data)
})

window.addEventListener('beforeunload', () => {
    generateMessage(username + " left!", 2);
    sessionStorage.removeItem("username");
})

document.getElementById('trigger').addEventListener('click', () => {
    const msg = messageInput.value;
    if(!msg) return;
    messageInput.value = "";
    generateMessage(msg, 0)
})

document.getElementById('home').addEventListener('click', () => {
    window.location.replace(home);
})




    



