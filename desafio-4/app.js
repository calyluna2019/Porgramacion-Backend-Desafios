/* const fs = require("fs/promises");
const { Contenedor } = require(`./Clases/Contenedor`); */
const express = require("express");


const app = express();
const PORT = 8080;

const productosRouter = require("./routes/productosRouter");
const productosRouterAPI = require("./routes/productosRouteApi");
app.use(express.json());

app.use("/api/productos", productosRouterAPI);

/* TODO */
app.use("/productos", productosRouter);

app.listen(PORT, () => {
  console.log(`servidor funcionando en el puerto:${PORT}`);
});
