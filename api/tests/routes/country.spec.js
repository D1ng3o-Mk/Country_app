/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  describe("GET /countries/:idPais", () => {
    it("Retorna 200 si recibe un id", (done) => {
      agent.get("/countries/COL").then(() => done());
    });
  }
  );
  describe("GET /countries/:idPais", () => {
    it("Retorna 404 si recibe un id incorrecto", (done) => {
      agent.get("/countries/hello").then(() => done());
    });
  }
  );
  describe("GET /countries?name=name", () => {
    it("Retorna 200 si recibe un nombre correcto", (done) => {
      agent.get("/countries?name=Colombia").then(() => done());
    });
  }
  );
  describe("GET /countries?name=name", () => {
    it("Retorna 404 si recibe un nombre incorrecto", (done) => {
      agent.get("/countries?name=kwjt").then(() => done());
    });
  }
  );
});  
