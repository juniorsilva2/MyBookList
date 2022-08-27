const BookModel = require("../models/bookModel");
const cacheKeys = [];

// Renderiza a página do livro
const verCache = async (req, res) => {
    try {
        const book = await BookModel.findOne({titulo: req.params.titulo})
        res.status(200).render("bookCache", { book });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    cacheKeys,
    verCache,
}
