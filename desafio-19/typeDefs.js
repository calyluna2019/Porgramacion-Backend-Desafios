const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Product {
    id: ID
    title: String
    description: String
    price: Float
  }
  type Query {
    hello: String
    getAllProducts: [Product]
    getProduct(id: ID): Product
  }
  input ProductInput {
    title: String,
    description: String,
    price: Float
  }
  type Mutation {
    createProduct(product: ProductInput!): Product
    deleteProduct(id: ID!): String
    updateProduct(id: ID!, product: ProductInput!): Product
  }
`;

module.exports = { typeDefs };
