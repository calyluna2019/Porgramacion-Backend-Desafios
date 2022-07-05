const { mariadb } = require('./config/mariaDB');
const { sqlite } = require('./config/sqlite3');

const mariaDB = require('knex')(mariadb);
const sqlite3 = require('knex')(sqlite);

(async () => {
    try {
        const isProductos = await mariaDB.schema.hasTable('productos');
        if(!isProductos) {
            console.log('Se creo la tabla productos');
            await mariaDB.schema.createTable('productos', table => {
                table.increments('id').primary().notNull(),
                table.string('title').notNull(),
                table.integer('price').notNull(),
                table.string('thumbnail')
            })
        }
        mariaDB.destroy() 

        const isMensajes = await sqlite3.schema.hasTable('mensajes');
        if (!isMensajes) {
            console.log('Se creo la tabla Mensajes');
            await sqlite3.schema.createTable('mensajes', table => {
                table.increments('id').primary().notNull(),
                table.string('usermail',250).notNull(),
                table.string('mensaje',300).notNull(),
                table.string('fecha',100)
            })
        }
        sqlite3.destroy()
    } catch (error) {
        console.log(error);
    }
})()