import Livros from "../model/Livro.js";

class LivroController {
  static listarLivros = async (req, res) => {
    try {
      const livros = await Livros.find().populate("autor");
      res.status(200).json(livros);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  static listarLivroPorId = async (req, res) => {
    const id = req.params.id;

    try {
      const livro = await Livros.findById(id).populate("autor","nome").exec();
      res.status(200).json(livro);
    } catch (error) {
      res.status(500).send(`${error.message} - Id do livro não localizado.`);
    }
  };

  static cadastrarLivro = async (req, res) => {
    try {
      const livro = new Livros(req.body);
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - falha ao cadastrar livro.` });
    }
  };

  static atualizarLivro = async (req, res) => {
    const id = req.params.id;

    try {
      await Livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static excluirLivro = async (req, res) => {
    const id = req.params.id;

    
    try {
      await Livros.findByIdAndRemove(id);
      res.status(200).send({ message: "Livro removido com sucesso" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static listarLivrosPorEditora  = async (req, res) => {
    const {editora} = req.query
    try {
      const livros = await Livros.find({"editora": editora}).exec()
      res.status(200).json(livros)
      
    } catch (error) {
      res.status(500).send(`${error.message} - Editora do livro não localizado.`);
      
    }
    }
}



export default LivroController;
