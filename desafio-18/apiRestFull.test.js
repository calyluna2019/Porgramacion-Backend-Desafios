const supertest = require("supertest");
const { expect } = require("chai");

const fakerUser = require("./utils/fackerUser");

const request = supertest("http://localhost:3000");

describe("test api rest", () => {
  describe("GET", () => {
    it("debe devolver un status 200", async () => {
      const response = await request.get("/users");
      expect(response.status).to.eql(200);
    });
  });
  describe("POST", () => {
    it("debe agregar un usuario", async () => {
      const usuario = fakerUser();

      const response = await request.post("/users").send(usuario);
      expect(response.status).to.eql(200);

      const user = response.body;
      expect(user).to.include.key("email", "username", "password");
      expect(user.email).to.eql(usuario.email);
      expect(user.username).to.eql(usuario.username);
      expect(user.password).to.eql(usuario.password);
    });
  });
});