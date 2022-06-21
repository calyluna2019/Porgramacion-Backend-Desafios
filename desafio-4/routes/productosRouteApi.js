const express = require("express");
const productosRouter = express.Router();

/* posiblemente para sacar el productosRoute */
//productosRouter.use(express.static("public"));

const productosController = require("../controllers/productoController");

productosRouter.get("/", productosController.getAll);
productosRouter.post("/", productosController.store);
productosRouter.get("/:id", productosController.getById);
productosRouter.put("/:id", productosController.update);
productosRouter.delete("/:id", productosController.eraser);

module.exports = productosRouter;