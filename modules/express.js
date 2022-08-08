const express = require("express");
const BookModel = require("../src/models/book.model");
const app = express();
const path = require("path");

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "../src/views");

app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`);
  console.log(`Content Type: ${req.headers["content-type"]}`);
  console.log(`Date: ${new Date()}`);

  next();
});

// Adicionar um livro ao MongoDB
app.post("/addLivro", async (req, res) => {
  try {
    const book = await BookModel.create(req.body);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Busca todos os livros e manda pro ejs
app.get("/home", async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).json(books).render("index", { books });
  } catch (error) {
    res.status(404).send(error);
  }
});

// Busca um livro individualmente
app.get("/home/:id", async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);
    if (book === null) {
      res.status(404).send("Livro não encontrado");
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

//Deleta um livro do banco
app.delete("/livro/:id", async (req, res) => {
  try {
    const book = await BookModel.findByIdAndRemove(req.params.id);
    if (book === null) {
      res.status(404).send("Livro não encontrado");
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Atualiza os dados de um livro
app.put("/livro/:id", async (req, res) => {
  try {
    const book = await BookModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send("Livro Atualizado com Sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(process.env.EXPRESS_PORT, () =>
  console.log(
    `Rodando na URL: http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`
  )
);
