const {sqlite} = require('../config/sqlite3');
class ContenedorSqlite {

    constructor() {
        this.knex = require('knex')(sqlite);
        this.table = 'mensajes';
    }
    async getAll() {
        try {
            return this.knex.from(this.table).select('*');
        }
        catch(error) {
            return `Se produjo un error: "${error}"`;
        }
    }
    async save(mensaje) {
        try {
            await this.knex(this.table).insert(mensaje);
        } 
        catch(error) {
            return `Se produjo un error: "${error}"`;
        }
    }
}

module.exports = {
    ContenedorSqlite
};