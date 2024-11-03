const socket = io('/');

const roomId = window.location.href.split('/').pop()
const username = sessionStorage.getItem("username");
const messageInput = document.getElementById('message');
const home = "https://sockets-qf6d.onrender.com";
const chatBox = document.getElementById("chatBox");
let last = "";

if(!username){
    window.location.replace(home);
    alert("You need a username")
}

function generateElement(tag, mClass, text){
    const element = document.createElement(tag);
    element.className = mClass;
    element.textContent = text;

    return element;
}

function updateChat(data){

    const newClass = (data.type == 0)? "right" : (data.type == 1)? "left": "center";
    const bubble = generateElement("div", "bubble " + newClass, "");

    if(data.type == 2)
        last = "";
    else if(last != data.user){
        const username = data.user;
        last = username;
        const title = generateElement("div", "title", username);
        bubble.className += " first";
        bubble.appendChild(title)
    }

    const msg = generateElement("div", "message", data.message);
    bubble.appendChild(msg);

    if(data.type != 2){
        const date = new Date();
        const format = date.toLocaleString('en-GB')
        const info = generateElement("div", "date", format);
        bubble.appendChild(info);
    }

    chatBox.appendChild(bubble)
    chatBox.scrollTop = chatBox.scrollHeight;
    bubble.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function generateMessage(msg, type){
    data = { 
        message: msg, 
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




    



