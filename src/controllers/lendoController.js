const LendoModel = require('../models/lendoModel');
const BookModel = require('../models/bookModel');
const redisClient = require('../database/redis');


// Renderiza a página do livro
const verLendo = async (req, res) => {
    try {
      const book = await LendoModel.findById(req.params.id);
      if (book === null) {
        res.status(404).send("Livro não encontrado");
      } else {
        res.status(200).render("bookLendo", { book });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
};

// Renderiza a página para escolher o livro
const verAddLendo = async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).render("addLendo", { books });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Adiciona um livro
const adicionarLivroLendo = async (req, res) => {
    try {
      const book = await BookModel.findById(req.params.id, { _id:0, titulo:1, autor:1, descricao:1, caminhoCapa:1 });
      const result = await LendoModel.insertMany(book);
      console.log(result);
      res.status(200).redirect("/user");
    } catch (error) {
      res.status(500).send(error.message);
    }
};

// Deleta um livro
const deletarLivroLendo = async (req, res) => {
    try {
      const book = await LendoModel.findByIdAndRemove(req.params.id);
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
    verLendo,
    adicionarLivroLendo,
    deletarLivroLendo,
    verAddLendo,
}