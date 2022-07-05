const socket = io();

const addProducts = document.querySelector('#productForm');
addProducts.addEventListener('submit', (e) => {
    e.preventDefault();

    let title = document.querySelector('#title').value;
    let price = document.querySelector('#price').value;
    let thumbnail = document.querySelector('#thumbnail').value;

    const product = {title, price, thumbnail};

    socket.emit('productsCreated', product);
});

const addMessageChat = document.querySelector('#chatForm');
addMessageChat.addEventListener('submit', (e) => {
    let usermail = document.querySelector('#email').value;
    let mensaje = document.querySelector('#message').value;
    let fecha = new Date().toLocaleString();

    const messages = {usermail, mensaje, fecha};
    socket.emit('chat-messages', messages);
});

async function renderProducts(products) {
    const template = await fetch('/views/productos.hbs');
    const texTemplate = await template.text();
    const functionTemplate = Handlebars.compile(texTemplate);
    const html = functionTemplate({products});

    document.querySelector('#productsList').innerHTML = html;

    document.querySelector('#title').value = '';
    document.querySelector('#price').value = '';
    document.querySelector('#thumbnail').value = '';
}

async function renderChats(messages) {
    const template = await fetch('/views/chats.hbs');
    const texTemplate = await template.text();
    const functionTemplate = Handlebars.compile(texTemplate);
    const html = functionTemplate({messages});

    document.querySelector('#chatList').innerHTML = html;

    document.querySelector('#email').value = '';
    document.querySelector('#message').value = '';
}

socket.on('products', renderProducts);
socket.on('messages', renderChats);