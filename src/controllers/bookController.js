const BookModel = require("../models/bookModel");

// Renderiza a página principal
const buscarLivros = async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).render("home", { books });
  } catch (error) {
    res.status(404).send(error);
  }
};

// Renderiza a página de adicionar livro
const novoLivro = async (req, res) => {
  try {
    res.status(200).render("insert");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Renderiza a página para atualizar e deletar o livro
const inspecionaLivro = async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);
    if (book === null) {
      res.status(404).send("Livro não encontrado");
    } else {
      res.status(200).render("update", { book });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Adiciona um livro
const adicionarLivro = async (req, res) => {
  try {
    const book = await BookModel.create(req.body);
    res.status(200).redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Atualiza os dados de um livro
const atualizarLivro = async (req, res) => {
  try {
    const book = await BookModel.findByIdAndUpdate(req.params.id, req.body);
    if(book === null){
      res.status(404).send("Livro não encontrado");
    } else {
      res.status(200).redirect("/");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Deleta um livro
const deletarLivro = async (req, res) => {
  try {
    const book = await BookModel.findByIdAndRemove(req.params.id);
    if (book === null) {
      res.status(404).send("Livro não encontrado");
    } else {
      res.status(200).redirect("/");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Método de testes
const teste = async (req, res) => {
  try {
    res.status(200).render("update")
  } catch (error) {
    res.status(500).send(error.message)
  }
}


module.exports = {
  adicionarLivro,
  buscarLivros,
  inspecionaLivro,
  atualizarLivro,
  deletarLivro,
  novoLivro,
  teste,
};
