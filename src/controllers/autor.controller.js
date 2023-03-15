import Autores from "../model/Autor.js";

class AutorController {
  static listarAutor = async (req, res) => {
    try {
      const autores = await Autores.find();
      res.status(200).json(autores);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  static listarAutorPorId = async (req, res) => {
    const id = req.params.id;

    try {
      const autor = await Autores.findById(id).exec();
      res.status(200).json(autor);
    } catch (error) {
      res.status(500).send(`${error.message} - Id do autor não localizado.`);
    }
  };

  static cadastrarAutor = async (req, res) => {
    try {
      const autor = new Autores(req.body);
      await autor.save();
      res.status(201).send(autor.toJSON());
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - falha ao cadastrar autor.` });
    }
  };

  static atualizarAutor = async (req, res) => {
    const id = req.params.id;

    try {
      await Autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "autor atualizado com sucesso" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static excluirAutor = async (req, res) => {
    const id = req.params.id;

    
    try {
      await Autores.findByIdAndRemove(id);
      res.status(200).send({ message: "autor removido com sucesso" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
}

export default AutorController;
