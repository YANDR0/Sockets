const socket = io('/');

const messageInput = document.getElementById('message');
const roomId = window.location.href.split('/').pop()

socket.emit('joinRoom', roomId)

socket.on('getMessage', (data) => {
    console.log(data)
})

document.getElementById('trigger').addEventListener('click', () => {
    const msg = messageInput.value;
    console.log('Vas a enviar el texto:', msg);

    socket.emit('sendMessage', {
        message: msg,
        room: roomId,
    });

    
})
