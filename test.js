const request = require('supertest');
const app = require('./index');
const bookController = require('./src/controllers/bookController');

const book1 = {
    _id: '63124edba333dd104e9a159e',
    titulo : "tituloTeste",
    autor : "autorTeste",
    descricao : "sinopseTeste",
    caminhoCapa : "capaTeste"
};

describe('Book domain', () => {
    // ------------------------------------------------------------------------------------------------
    //                                      TESTES DE INTEGRAÇÃO
    // ------------------------------------------------------------------------------------------------

    // Testa a rota novoLivro
    describe('#novoLivro', () => {
        it('should return status 200 after render a page', async () => {
            const res = await request(app).get('/novoLivro');
            expect(res.statusCode).toEqual(200);
        });
    });

    // Testa a rota addLivro
    describe('#adicionarLivro', () => {
        it('should return status 302 and redirect, after inserting a book into the ADM list', async () => {
            const res = await request(app).post('/addLivro').send(book1);
            expect(res.statusCode).toEqual(302);
            expect(res.redirect).toEqual(true);
        });
    });

    // Testa a rota deleteLivro
    describe('#deletarLivro', () => {
        it('should return status 302 and redirect, after deleting a book from ADM list', async () => {
            const res = await request(app).get('/deleteLivro/' + book1._id)
            expect(res.statusCode).toEqual(302);
            expect(res.redirect).toEqual(true);
        });
    });


});