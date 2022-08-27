const LerDepoisModel = require('../models/lerDepoisModel');
const BookModel = require('../models/bookModel');


// Renderiza a página do livro
const verLerDepois = async (req, res) => {
    try {
      const book = await LerDepoisModel.findById(req.params.id);
      if (book === null) {
        res.status(404).send("Livro não encontrado");
      } else {
        res.status(200).render("bookLerDepois", { book });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
};

// Renderiza a página para escolher o livro
const verAddLerDepois = async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).render("addLerDepois", { books });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Adiciona um livro
const adicionarLivroLerDepois = async (req, res) => {
    try {
      const book = await BookModel.findById(req.params.id, { _id:0, titulo:1, autor:1, descricao:1, caminhoCapa:1 });
      const result = await LerDepoisModel.insertMany(book);
      console.log(result);
      res.status(200).redirect("/user");
    } catch (error) {
      res.status(500).send(error.message);
    }
};

// Deleta um livro
const deletarLivroLerDepois = async (req, res) => {
    try {
      const book = await LerDepoisModel.findByIdAndRemove(req.params.id);
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
    verLerDepois,
    adicionarLivroLerDepois,
    deletarLivroLerDepois,
    verAddLerDepois,
}