db = connect( 'mongodb://localhost/ecommerce' );

/* 1 y 2 */
db.createCollection("productos");
db.createCollection("mensajes");
db.productos.insertMany([
    {nombre:"Guitarra eléctrica",precio:120,foto:"https://http2.mlstatic.com/D_NQ_NP_794280-MLA43993806821_112020-O.webp"},
    {nombre:"bajo ibanez",precio:580,foto:"https://http2.mlstatic.com/D_NQ_NP_759318-MLA46884190629_072021-W.webp"},
    {nombre:"bajo yamaha",precio:900,foto:"https://http2.mlstatic.com/D_NQ_NP_955583-MLA41168267303_032020-W.webp"},
    {nombre:"teclado korg",precio:1280,foto:"https://http2.mlstatic.com/D_NQ_NP_859319-MLA46365254702_062021-O.webp"},
    {nombre:"teclado casio",precio:1700,foto:"https://http2.mlstatic.com/D_NQ_NP_931908-MLA46440505788_062021-O.webp"},
    {nombre:"tumbadoras",precio:2300,foto:"https://http2.mlstatic.com/D_NQ_NP_743469-MLA49714461264_042022-O.webp"},
    {nombre:"bateria",precio:2860,foto:"https://http2.mlstatic.com/D_NQ_NP_845390-MLA43844397323_102020-O.webp"},
    {nombre:"guitarra electroacústica",precio:3350,foto:"https://http2.mlstatic.com/D_NQ_NP_752332-MLA41220506983_032020-W.webp"},
    {nombre:"guitarra acústica",precio:4320,foto:"https://http2.mlstatic.com/D_NQ_NP_903995-MLA45229375001_032021-O.webp"},
    {nombre:"amplificador",precio:4990,foto:"https://http2.mlstatic.com/D_NQ_NP_865496-MLA42349359269_062020-O.webp"},
])
db.mensajes.insertMany([
    {usermail:"persona1@gmail.com.ar",fecha:ISODate(),mensaje:"Hola"},
    {usermail:"carlos@gmail.com.ar",fecha:ISODate(),mensaje:"todo bien?"},
    {usermail:"persona1@gmail.com.ar",fecha:ISODate(),mensaje:"Hola"},
    {usermail:"carlos@gmail.com.ar",fecha:ISODate(),mensaje:"que paso?"},
    {usermail:"persona1@gmail.com.ar",fecha:ISODate(),mensaje:"nose la verdad"},
    {usermail:"carlos@gmail.com.ar",fecha:ISODate(),mensaje:"probando"},
    {usermail:"persona1@gmail.com.ar",fecha:ISODate(),mensaje:"asi es"},
    {usermail:"carlos@gmail.com.ar",fecha:ISODate(),mensaje:"chau"},
    {usermail:"persona1@gmail.com.ar",fecha:ISODate(),mensaje:"nos vemos"},
    {usermail:"carlos@gmail.com.ar",fecha:ISODate(),mensaje:"hasta la vista"},
])

/* 3 */
print("\nColección productos:\n")
printjson(db.productos.find());
print("Colección mensajes:\n")
printjson(db.mensajes.find());

/* 4 */
print(`Cantidad de productos: ${db.productos.estimatedDocumentCount()}`);
print(`Cantidad de mensajes: ${db.productos.estimatedDocumentCount()}`);

/* 5 - a) */
db.productos.insertOne({nombre:"timbales",precio:4010,foto:"https://http2.mlstatic.com/D_NQ_NP_793185-MLA47007220886_082021-O.webp"});

/* 5 - b) */
/* i */
db.productos.find({"precio":{$lt:1000}},{"nombre":1});

/* ii */
db.productos.find({"precio":{$gte:1000,$lte:3000}},{"nombre":1});

/* iii */
db.productos.find({"precio":{$gt:3000}},{"nombre":1});

/* iv */
db.productos.find().skip(2).limit(1).sort({"precio": 1})

/* 5 - c) */
db.productos.updateMany({},{$set:{"stock":100}});

/* 5 -d) */
db.productos.updateMany({"precio":{$gt:4000}},{$set:{"stock":0}});

/* 5 -e) */
db.productos.deleteMany({"precio":{$lt:1000}});

/* 6 */
db = connect( 'mongodb://localhost/admin' );

db.createUser(
    {
        user: "pepe",
        pwd:"asd456",
        roles:[
            {role:"read",db:"ecommerce"}
        ]
    }
);