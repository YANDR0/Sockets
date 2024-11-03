
const messageInput = document.getElementById('message');

document.getElementById('trigger').addEventListener('click', () => {
    const name = messageInput.value;
    if(name) sessionStorage.setItem("username", name);
})