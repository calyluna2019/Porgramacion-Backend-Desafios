/* TODO */
const express = require("express");
const productosRouter = express.Router();

productosRouter.use(express.static("public"));

module.exports = productosRouter;