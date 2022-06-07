class Usuario {

    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }
    
    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        this.libros.push({nombre, autor})
    }

    getBookNames() {
        return this.libros.map(({ nombre }) => nombre);
    }
}

/* Usuario */
const usuario1 = new Usuario('Carlos','Luna');

/* agregar mascotas */
usuario1.addMascota('perro');
usuario1.addMascota('gato');

/* mostrar cantidad de mascotas */
console.log(usuario1.countMascotas());

/* agregar libros */
usuario1.addBook('El señor de las moscas', 'William Golding');
usuario1.addBook('Fundacion', 'Isaac Asimov');

/* mostrar nombres de los libros */
console.log(usuario1.getBookNames());

/* mostrar nombre completo */
console.log(usuario1.getFullName());
