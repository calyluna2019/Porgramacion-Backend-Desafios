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

document.getElementById('btnMensajeEnviar').addEventListener('click', () => {
    cleanErrors();
    let form_validation = true;

    if (!isRequired(document.getElementById('usermail').value)) {
        showError('usermail', 'Este es un campo requerido');
        form_validation = false;
    }

    if (!isRequired(document.getElementById('mensaje').value)) {
        showError('mensaje', 'Este es un campo requerido');
        form_validation = false;
    }

    if (form_validation){
        const mensaje = {
            author:{
                id: document.getElementById('usermail').value,
                nombre: document.getElementById('nombre_usuario').value,
                apellido: document.getElementById('apellido').value,
                edad: document.getElementById('edad').value,
                alias: document.getElementById('alias').value,
                avatar: document.getElementById('avatar').value
            },
            text:document.getElementById('mensaje').value,
            fecha: new Date().toLocaleString()
        }

        document.getElementById('form_mensaje').reset();
        document.getElementById('mensaje').focus();

        socket.emit('new-message', mensaje);
    }
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

async function renderChats(mensajes) {
    const authorSchema = new normalizr.schema.Entity('authors')
    const messageSchema = new normalizr.schema.Entity('mensajes', {
      author: authorSchema,
    },{idAttribute:'_id'})
    const global = new normalizr.schema.Entity('global', {
      messages: [messageSchema],
    })    
    
    const dataDeno = normalizr.denormalize(mensajes.result,global,mensajes.entities)

    const porcentajeReduccion = Math.floor(
        100 - (JSON.stringify(mensajes).length * 100) / JSON.stringify(dataDeno).length
        )
    
    document.getElementById('porcentaje').innerHTML = porcentajeReduccion;

    const html = dataDeno.messages.map(mensaje => {
        return (`
            <div>
                <b style="color:blue;">${mensaje.author.id}</b>
                [<span style="color:brown;">${mensaje.fecha}</span>] :
                <i style="color:green;">${mensaje.text}</i>
                <img style="width: 30px; border-radius: 100%" src="${mensaje.author.avatar == '' ? 'https://www.gravatar.com/avatar/' : mensaje.author.avatar  }">
            </div>
        `)
    }).join(" ");

    document.getElementById('mensajes').innerHTML = html
}

const isRequired = value => value === '' ? false : true;

const showError = (input_id, message) => {
    const input = document.querySelector(`#${input_id}`);
    input.classList.add('is-invalid');
    const error = input.parentElement.querySelector('.invalid-feedback');
    error.textContent = message;
};

const cleanErrors = () => {
    const elements = document.querySelectorAll(".form-control, .form-select");
    elements.forEach(function (element) {
        element.classList.remove('is-invalid');
    });
}

socket.on('products', renderProducts);
socket.on('messages', renderChats);