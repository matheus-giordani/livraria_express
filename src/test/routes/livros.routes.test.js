import app from "../../app.js";
import { beforeEach, afterEach} from "@jest/globals";
import request from "supertest";

let server;
beforeEach(() => {
  
  server = app.listen(3000);
});

afterEach(async () => {
  
  await server.close();
  
});

describe("teste das rotas de livros", () => {
  it("GET - deve retornar todos os autores cadastrados", async () => {
    await request(app)
      .get("/livros")
      .expect(200)
      .then((value) => {
        expect(value.body[0]).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            titulo: expect.any(String),
            autor: expect.objectContaining({
              _id: expect.any(String),
              nome: expect.any(String),
              nacionalidade: expect.any(String),
            }),
            editora: expect.any(String),
            numero_paginas: expect.any(Number),
          })
        );
      });
  });
});
