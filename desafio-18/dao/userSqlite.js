const UserSqlite = require("../models/userSqlite");

class User {
  constructor() {
    this.model = UserSqlite;
  }
  getAll = async () => {
    return await this.model.findAll();
  };
  save = async (user) => {
    return await this.model.create(user);
  };
}

module.exports = User;
