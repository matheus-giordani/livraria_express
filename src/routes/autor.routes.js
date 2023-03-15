import express from "express";
import AutorController from "../controllers/autor.controller.js";

const router = express.Router();
router
  .get("/autor", AutorController.listarAutor)
  .get("/autor/:id", AutorController.listarAutorPorId)
  .post("/autor", AutorController.cadastrarAutor)
  .put("/autor/:id", AutorController.atualizarAutor)
  .delete("/autor/:id", AutorController.excluirAutor)

export default router