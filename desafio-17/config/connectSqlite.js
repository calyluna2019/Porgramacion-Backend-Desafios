const config = require("../config/config");
const path = require("path");
const Sequelize = require("sequelize");

const dirname = require("../utils/utils");
const pathFile = path.join(dirname, "data", config.app.dbSqlite);

const connSqlite = new Sequelize(
  "database",
  process.env.USER,
  process.env.PASSWORD,
  {
    host: "0.0.0.0",
    dialect: "sqlite",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    storage: pathFile,
  }
);

module.exports = connSqlite;
