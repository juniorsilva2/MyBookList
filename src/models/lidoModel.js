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

const LidoModel = mongoose.model("lido", bookSchema);

module.exports = LidoModel;
