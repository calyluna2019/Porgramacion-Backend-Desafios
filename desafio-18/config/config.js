require("dotenv").config();

module.exports = {
  app: {
    persistence: process.env.PERSISTENCE,
    mongoUri: process.env.MONGO_URI,
    dbSqlite: process.env.DB_SQLITE,
    fileJson: process.env.FILE_JSON
  },
};