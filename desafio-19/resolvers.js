const Product = require("./models/Product");

const resolvers = {
  Query: {
    hello: () => {
      return "Hola Mundo...";
    },
    getAllProducts: async () => {
      const products = await Product.find();
      return products;
    },
    getProduct: async (_, args) => {
      const { id } = args;
      const product = await Product.findById(id);
      return product;
    },
  },
  Mutation: {
    createProduct: async (parent, args, context, info) => {
      const { title, description, price } = args.product;
      const newProduct = new Product({ title, description, price });
      await newProduct.save();
      return newProduct;
    },
    deleteProduct: async (_, { id }) => {
      await Product.findByIdAndDelete(id);
      return `EL id ${id} fue eliminado`;
    },
    updateProduct: async (_, { id, product }) => {
      const updateProduct = await Product.findByIdAndUpdate(
        id,
        { $set: product },
        { new: true }
      );
      return updateProduct;
    },
  },
};

module.exports = { resolvers };
