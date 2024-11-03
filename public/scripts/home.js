
const messageInput = document.getElementById('message');
sessionStorage.removeItem("username");

document.getElementById('trigger').addEventListener('click', () => {
    const name = messageInput.value;
    if(!name) return; 
    sessionStorage.setItem("username", name);
    document.getElementById('temp').innerHTML = 
    `<ul>
        <li><a href="chat/1">Sala 1</a></li>
        <li><a href="chat/2">Sala 2</a></li>
        <li><a href="chat/3">Sala 3</a></li>
        <li><a href="chat/4">Sala 4</a></li>
        <li><a href="chat/5">Sala 5</a></li>
    </ul>`;
});
