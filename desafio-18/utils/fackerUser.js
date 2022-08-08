const { faker } = require("@faker-js/faker");

function fakerUser() {
  return {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };
}

module.exports = fakerUser;