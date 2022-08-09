const dotenv = require("dotenv");
const connectToDatabase = require("./src/database/mongodb");
const express = require("express");
const path = require("path");
const bookController = require("./src/controllers/bookController");
const BookModel = require("./src/models/bookModel");
const app = express();
const bodyParser = require('body-parser');

dotenv.config();
connectToDatabase();
app.use(express.json());
app.use(express.static(path.join(__dirname, "src/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Renderiza a página principal
app.get("/", bookController.buscarLivros);

// Renderiza a página de adicionar livro
app.get("/novoLivro", bookController.novoLivro);

// Renderiza a página para atualizar e deletar o livro
app.get("/Livro/:id", bookController.inspecionaLivro);

// Adiciona um livro
app.post("/addLivro", bookController.adicionarLivro);

// Atualiza os dados de um livro
// app.put("/updateLivro/:id", bookController.atualizarLivro);
app.post("/updateLivro/:id", bookController.atualizarLivro);

// Deleta um livro
// app.delete("/deleteLivro/:id", bookController.deletarLivro);
app.get("/deleteLivro/:id", bookController.deletarLivro);


// Rota de testes
app.get("/teste", bookController.teste);

app.listen(process.env.EXPRESS_PORT, () =>
  console.log(
    `Rodando na URL: http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`
  )
);
