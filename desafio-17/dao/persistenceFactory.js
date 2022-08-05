const config = require("../config/config");

const userMongo = require("../dao/userMongo");
const userJson = require("../dao/userJson");
const userSqlite = require("../dao/userSqlite");

class PersistenceFactory {
  static getPersistence = async () => {
    switch (config.app.persistence) {
      case "MONGO":
        return new userMongo();
      case "JSON":
        return new userJson();
      case "SQLITE":
        return new userSqlite();
    }
  };
}

module.exports = PersistenceFactory;
