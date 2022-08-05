const fs = require("fs");
const path = require("path");
const config = require("../config/config");

const dirname = require("../utils/utils");

class User {
  constructor() {
    this.pathFile = path.join(dirname, "data", config.app.fileJson);
    this.init();
  }
  init = async () => {
    if (!fs.existsSync(this.pathFile)) {
      await fs.promises.writeFile(this.pathFile, JSON.stringify([]));
    }
  };
  readFile = async () => {
    const data = await fs.promises.readFile(this.pathFile, "utf-8");
    return JSON.parse(data);
  };
  getAll = async () => {
    return await this.readFile();
  };
  save = async (user) => {
    let users = await this.readFile();
    if (users.length === 0) user.id = 1;
    else user.id = users[users.length - 1].id + 1;
    users.push(user);
    await fs.promises.writeFile(
      this.pathFile,
      JSON.stringify(users, null, "\t")
    );
    return user;
  };
}

module.exports = User;
