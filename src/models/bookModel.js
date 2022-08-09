const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    unique: true,
  },
  autor: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
  },
  caminhoCapa: {
    type: String,
    required: true,
  },
});

const BookModel = mongoose.model("book", bookSchema);

module.exports = BookModel;
