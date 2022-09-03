const BookModel = require("../models/bookModel");
const LendoModel = require("../models/lendoModel");
const LidoModel = require("../models/lidoModel");
const LerDepoisModel = require("../models/lerDepoisModel");
const bookCacheController = require("../controllers/bookCacheController");
const {client} = require("../database/redis");
const {cacheKeys} = require("../controllers/bookCacheController");

// Renderiza a página principal
const buscarLivros = async (req, res) => {
  try {
    const books = await BookModel.find();
    if (books === null) {
      res.status(404).render("home", { books });
    } else {
      res.status(200).render("home", { books });
    }
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
    await client.set(book.titulo, book.titulo, {EX: 1800});
    cacheKeys.push(book.titulo);
    res.status(302).redirect("/");
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
      res.status(302).redirect("/");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Renderiza a página das listas de usuários
const livrosUser = async (req, res) => {
  try {
    const booksLendo = await LendoModel.find()
    const booksLido = await LidoModel.find()
    const booksLerDepois = await LerDepoisModel.find()
    const booksCache = []
    const books = []
    let count = 0

    for (const cacheKey of cacheKeys) {
      const bookCache = await client.get(cacheKey)
      books.push(bookCache)
      const temp = await BookModel.find({titulo: books[count]}, {_id:0, titulo:1, autor:1, descricao:1, caminhoCapa:1});
      booksCache.push(temp);
      count++
    }
    res.status(200).render("index", { booksLendo, booksLido, booksLerDepois, booksCache: booksCache.flat() });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  adicionarLivro,
  buscarLivros,
  inspecionaLivro,
  atualizarLivro,
  deletarLivro,
  novoLivro,
  livrosUser,
};
