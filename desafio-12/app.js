const app = require("./src/server");
const argv = require('./src/config/yargs');

/* por consola para el puerto es -p o -port */
const PORT = argv.p || 8080;

app.listen(PORT, () => {
  console.log("Server listening on port:", PORT);
});