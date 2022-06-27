const express = require('express');
const {Server:HttpServer} = require('http');
const {Server:IOServer} = require('socket.io');

const PORT = 3000;

const products = [];
const messages = [];

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('public'));

httpServer.listen(PORT, () => console.log('listening on port ' + PORT))

io.on('connection', (socket) =>{
    console.log('User connected');
    socket.emit('products', products);
    socket.emit('messages', messages);

    socket.on('productsCreated', (data) => {
        products.push(data);
        io.sockets.emit('products', products);
    });

    socket.on('chat-messages', (data) => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

