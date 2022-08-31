const LidoModel = require('../models/lidoModel');
const LendoModel = require('../models/lendoModel')
const BookModel = require('../models/bookModel');


// Renderiza a página do livro
const verLido = async (req, res) => {
    try {
      const book = await LidoModel.findById(req.params.id);
      if (book === null) {
        res.status(404).send("Livro não encontrado");
      } else {
        res.status(200).render("bookLido", { book });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
};

// Adiciona um livro e retira o mesmo da lista 'Lendo'
const adicionarLivroLido = async (req, res) => {
    try {
      const book = await BookModel.findOne({titulo: req.params.titulo}, { _id:0, titulo:1, autor:1, descricao:1, caminhoCapa:1 });
      await LidoModel.insertMany(book);
      await LendoModel.findOneAndRemove({titulo: req.params.titulo}); 
      res.status(200).redirect("/user");
    } catch (error) {
      res.status(500).send(error.message);
    }
};

// Deleta um livro
const deletarLivroLido = async (req, res) => {
    try {
      const book = await LidoModel.findByIdAndRemove(req.params.id);
      if (book === null) {
        res.status(404).send("Livro não encontrado");
      } else {
        res.status(200).redirect("/user");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
};

module.exports = {
    verLido,
    adicionarLivroLido,
    deletarLivroLido,
}