const productos = require(`../models/Producto`);

function store(request, response){
  const newProducto = request.body;
  try {
    let id;
    if(productos.length>0){
        const ultim = productos.find((e) => productos[productos.length - 1].id == e.id);
        id = ultim.id + 1;
    } else {
        id = 1;
    }
    const prod = {...newProducto,id}
    productos.push(prod);
    response.status(201).json({
      message: "Producto agregado correctamente",
      id: productos[productos.length - 1].id,
    });
      
  } catch (error) { 
    response.status(404).json({
      message: "Hubo un error al crear el producto",
    });
  }
}
function getById(request, response) {
    try {
        const id = Number(request.params.id);
        const producto = productos.find((prod) => prod.id === id);

        if (!producto) {
          response.status(404).json({
              message: "Producto no encontrado",
          });
        }

        response.status(200).json(producto);
    } catch (error) {
        response.status(404).json({
            message: "Hubo un error al buscar el producto",
        });
    }
  }
function getAll(request, response){
  try {
    response.status(200).json(productos);
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al obtener los productos",
    });
  }
}
function update(request, response) {
  try {
    const id = Number(request.params.id);
    const productoIndex = productos.find((producto) => producto.id === id);
    productoIndex.title = request.body.title;
    productoIndex.price = request.body.price;
    productoIndex.thumbnail = request.body.thumbnail;
    response.status(200).json({
      response:productoIndex,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al modificar el producto",
    });
  }
}

function eraser(request, response) {
  try {
    const id = Number(request.params.id);
    const prodDelete = productos.find((e)=>e.id === id);
    if(prodDelete){
        productos.splice(id-1,1)
        response.status(200).json({
          message: "Se ha borrado el producto exitosamente",
          id:id,
        });
    } else {
      response.status(404).json({
        message: "el id que quiere borrar no existe",
        id:id,
      });
    }
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al borrar el producto",
    });
  }
}

module.exports = {
  getAll,
  store,
  getById,
  update,
  eraser
};