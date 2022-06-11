const fs = require("fs/promises");
const { Contenedor } = require(`./Clases/Contenedor`);
const { Producto } = require(`./Clases/Producto`);

/* Instancia Contenedor */
const contenedor = new Contenedor("productos.txt", fs);

/* 1 - Instancias Productos */
const producto1 = new Producto("Piano", 425490.00, "https://http2.mlstatic.com/D_NQ_NP_988553-MLA49863790611_052022-V.webp");
const producto2 = new Producto("Teclado", 32550.00, "https://http2.mlstatic.com/D_NQ_NP_721891-MLA44808836582_022021-V.webp");
const producto3 = new Producto("Bateria", 174300.00, "https://http2.mlstatic.com/D_NQ_NP_998720-MLA43136233557_082020-V.webp");
const producto4 = new Producto("Bajo Eléctrico", 360000.00, "https://http2.mlstatic.com/D_NQ_NP_809320-MLA43567237350_092020-W.webp");
const producto5 = new Producto("Guitarra Eléctrica", 830000.00, "https://http2.mlstatic.com/D_NQ_NP_704711-MLA43506460198_092020-W.webp");

/* 2 - guardar productos asignando su ID */
contenedor.save(producto1); //ejecutar por cada producto

/* 3 - Obtener todos */
// contenedor.getAll()
//     .then(el=> console.log(el))
//     .catch(err => console.log(err));

/* 4 - obtener por ID */
// contenedor.getById(2)
//     .then(el=> console.log(el))

/* 5 - Borrar por ID */
// contenedor.deleteById(19);

/* borrar todo los objetos */
// contenedor.deleteAll();
