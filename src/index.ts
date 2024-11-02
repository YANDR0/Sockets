import express from "express";
import path from "path";
import { Server } from 'socket.io' 

const port = process.env.PORT || 3000;
const app = express();

app.use('', express.static(path.join(__dirname, '..', 'public')));

app.get('', (req, res) => {
    res.send('Api works!');
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'home.html'));
});

app.get('/chat/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'chat.html'));
});

const server = app.listen(port, () => {
    console.log(`Puerto ${port}`)
})

const io = new Server(server);

io.on('connection', (socket) => {
    //console.log('Se conecto al cliente');

    socket.on('joinRoom', (id) => {
        socket.join('room-' + id)
    })

    socket.on('sendMessage', (data) => {
        console.log(data);

        socket.to('room-' + data.room).emit('getMessage', data)
        //socket.broadcast.emit('getMessage', data);  //Todos menos yo
        //socket.to(data.room).emit(data)   Todos menos yo y room
        //io.emit(data)     Todos incluyendome
    })
})


