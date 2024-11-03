const socket = io('/');

const roomId = window.location.href.split('/').pop()
const username = sessionStorage.getItem("username");
const messageInput = document.getElementById('message');

if(!username){
    window.location.replace("http://localhost:3000/home");
    alert("You need a username")
} 
var chat = []

function generateMessage(msg, type){
    data = { 
        message: msg, 
        date: new Date(),
        user: username,
        room: roomId,
        mType: type
    };

    if(type != 2){
        chat.push(data)
        data = {...data, type: 1}
    }
    socket.emit('sendMessage', data);
    console.log(chat)
}

socket.emit('joinRoom', roomId)
generateMessage(username + " joined!", 2)

socket.on('getMessage', (data) => {
    chat.push(data)
    console.log(chat)
})

window.addEventListener('beforeunload', () => {
    generateMessage(username + " left!", 2);
    sessionStorage.clear();
})

document.getElementById('trigger').addEventListener('click', () => {
    const msg = messageInput.value;
    generateMessage(msg, 0)
})

document.getElementById('home').addEventListener('click', () => {
    window.location.replace("http://localhost:3000/home");
})


