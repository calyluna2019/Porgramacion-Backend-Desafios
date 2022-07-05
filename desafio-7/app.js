const express = require('express');
const {Server:HttpServer} = require('http');
const {Server:IOServer} = require('socket.io');
const {ContenedorMariaDB} = require('./models/ContenedorMariaDB');
const {ContenedorSqlite} = require('./models/ContenedorSqlite');

const PORT = 8080;

const products = new ContenedorMariaDB();
const messages = new ContenedorSqlite();

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('public'));

httpServer.listen(PORT, () => console.log('listening on port ' + PORT))

io.on('connection', async socket =>{
    console.log('User connected');
    socket.emit('products', await products.getAll());
    socket.emit('messages', await messages.getAll());

    socket.on('productsCreated', async data => {
        await products.save(data);
        io.sockets.emit('products', await products.getAll());
    });

    socket.on('chat-messages', async data => {
        await messages.save(data);
        io.sockets.emit('messages', await messages.getAll());
    });
});

