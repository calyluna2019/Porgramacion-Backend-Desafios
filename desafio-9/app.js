const express = require('express');
const { engine } = require('express-handlebars');
const {Server:HttpServer} = require('http');
const {Server:IOServer} = require('socket.io');
const productosTest = require('./routes/productosTest');
const {ContenedorMariaDB} = require('./models/ContenedorMariaDB');
const {ContenedorSqlite} = require('./models/ContenedorSqlite');
const ContenedorMongoDB = require('./models/ContenedorMongoDB');
const Normalizer = require('./models/normalizer');
const { dbConnection } = require('./config/mongoDB');

const normalizer = new Normalizer();

const PORT = 8080;

(async () => {
    await dbConnection();
})();

const products = new ContenedorMariaDB();
const messages = new ContenedorMongoDB();

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

app.engine('handlebars', engine());

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/api/productos-test', productosTest);

httpServer.listen(PORT, () => console.log('listening on port ' + PORT))

io.on('connection', async socket =>{
    console.log('User connected');
    socket.emit('products', await products.getAll());
    socket.emit('messages', await messages.getAll());

    socket.on('productsCreated', async data => {
        await products.save(data);
        io.sockets.emit('products', await products.getAll());
    });

    const mensajes = await messages.getAll();
    const data = normalizer.getDataNormalized(mensajes)

    socket.emit('messages', data);

    socket.on('chat-messages', async data => {
        await messages.save(data);
        io.sockets.emit('messages', await messages.getAll());
    });
});

