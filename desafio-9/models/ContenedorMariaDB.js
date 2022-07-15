const {mariadb} = require("../config/mariaDB")
class ContenedorMariaDB {

    constructor() {
        this.knex = require('knex')(mariadb);
        this.table = 'productos';
    }
    async getAll() {
        try {
            return this.knex.from(this.table).select('*');
        }
        catch(error) {
            return `Se produjo un error: "${error}"`;
        }
    }

    async save(producto) {
        try {
            await this.knex(this.table).insert(producto);
        } 
        catch(error) {
            return `Se produjo un error: "${error}"`;
        }
    }
}

module.exports = {
    ContenedorMariaDB
};