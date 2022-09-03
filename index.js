const dotenv = require("dotenv");
const connectToDatabase = require("./src/database/mongodb");
const connectToRedis = require("./src/database/redis");
const express = require("express");
const path = require("path");
const bookController = require("./src/controllers/bookController");
const lidoController = require("./src/controllers/lidoController");
const lendoController = require("./src/controllers/lendoController");
const lerDepoisController = require("./src/controllers/lerDepoisController");
const bookCacheController = require("./src/controllers/bookCacheController");
const BookModel = require("./src/models/bookModel");
const LidoModel = require("./src/models/lidoModel");
const LendoModel = require("./src/models/lendoModel");
const LerDepoisModel = require("./src/models/lerDepoisModel");
const app = express();
const bodyParser = require('body-parser');

dotenv.config();
connectToDatabase();
connectToRedis.connectToRedis();
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
app.get("/atualizaLivro/:id", bookController.inspecionaLivro);

// Adiciona um livro
app.post("/addLivro", bookController.adicionarLivro);

// Atualiza os dados de um livro
app.post("/updateLivro/:id", bookController.atualizarLivro);

// Deleta um livro
app.get("/deleteLivro/:id", bookController.deletarLivro);

// Renderiza a página principal do usuário
app.get("/user", bookController.livrosUser);


// Páginas para adicionar livros as listas
app.get("/user/addLendo", lendoController.verAddLendo);
app.get("/user/addLerDepois", lerDepoisController.verAddLerDepois);


//Páginas para ver o livro de cada lista
app.get("/user/verLendo/:id", lendoController.verLendo);
app.get("/user/verLido/:id", lidoController.verLido);
app.get("/user/verLerDepois/:id", lerDepoisController.verLerDepois);
app.get("/user/verCache/:titulo", bookCacheController.verCache);


// Métodos para adicionar livros às listas
app.get("/user/addLivroLendo/:id", lendoController.adicionarLivroLendo);
app.get("/user/addLivroLido/:titulo", lidoController.adicionarLivroLido);
app.get("/user/addLivroLerDepois/:id", lerDepoisController.adicionarLivroLerDepois);


// Métodos para deletar livros das listas
app.post("/user/deleteLivroLendo/:id", lendoController.deletarLivroLendo);
app.post("/user/deleteLivroLido/:id", lidoController.deletarLivroLido);
app.post("/user/deleteLivroLerDepois/:id", lerDepoisController.deletarLivroLerDepois);



// Rota de testes
// app.get("/teste/:id", bookController.teste);

app.listen(process.env.EXPRESS_PORT, () =>
  console.log(
    `Rodando na URL: http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`
  )
);

module.exports = app;