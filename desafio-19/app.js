require("dotenv").config();

const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");

const { connectDB } = require("./db");

const app = express();

connectDB();

async function start() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.get("/", (req, res) => {
    res.send("Graphql");
  });

  app.use("*", (req, res) => {
    res.send("404 Not Found");
  });

  const PORT = process.env.PORT || 3000; 

  app.listen(PORT, () => {
    console.log("Server up", PORT);
  });
}

start();
