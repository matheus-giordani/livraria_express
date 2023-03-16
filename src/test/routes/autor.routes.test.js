import { describe, expect, it, jest } from "@jest/globals";
import request from "supertest";
import app from "../../app";

let server;
beforeEach(() => {
  server = app.listen(3000);
});

afterEach(async () => {
  await server.close();
});
describe("teste das rotas de autor", () => {
  it("GET - deve retornar todos os autores cadastrados", async () => {
    await request(app)
      .get("/autor")
      .expect(200)
      .then((value) => {
        expect(value.body[0]).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            nome: expect.any(String),
            nacionalidade: expect.any(String),
          })
        );
      });
  });

  let idAutor;
  it("POST - deve realizar post pra rota de autor", async () => {
    const autor = {
      nome: "teste",
      nacionalidade: "britânico",
    };

    const res = await request(app).post("/autor").expect(201).send(autor);

    expect(res.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        nome: "teste",
        nacionalidade: "britânico",
      })
    );
    idAutor = res.body._id;
  });

  it("PUT - deve realizar put pra rota de autor", async () => {
    const autor = {
      nome: "teste_feito_put",
      nacionalidade: "britânico",
    };

    const req = { request };
    const spy = jest.spyOn(req, "request");
    await req
      .request(app)
      .put(`/autor/${idAutor}`)
      .expect(200)
      .send(autor)
      .then((value) => {
        expect(value.body).toEqual({
          message: "autor atualizado com sucesso!",
        });
      });

    expect(spy).toHaveBeenCalled();
  });

  it(`DELETE - deve deletar autor de id ${idAutor}`, async () => {
    await request(app)
      .delete(`/autor/${idAutor}`)
      .expect(200)
      .then((value) => {
        expect(value.body).toEqual({
          message: "autor removido com sucesso",
        });
      });
  });
});
