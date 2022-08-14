'use strict'
const ProductsModel = use('App/Models/Product')

class ProductController {
    async getProducts() {
        return await ProductsModel.all();
    }

    async saveProduct(product) {
        const product = await ProductsModel.save(product);
    }
}

module.exports = ProductController
