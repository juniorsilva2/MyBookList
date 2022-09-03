const puppeteer = require('puppeteer');

(async () => {
    // Teste de Sistema para adicionar um livro.
    const browser = await puppeteer.launch({headless: false,});
    const page = await browser.newPage();
    // Acessa a homepage
    await page.goto('http://localhost:3003/');

    // Acessa a página de adiconar livro clicando no botão "Adicionar Livro"
    await page.click('[href="/novoLivro"]');

    // Insere os dados do Livro "A Arte da Guerra"
    await page.type('[name="titulo"]', 'A Arte da Guerra');
    await page.type('[name="autor"]', 'Sun Tzu');
    await page.type('[name="descricao"]', 'Táticas para conquistar a vitória, abreviar o caos, aplicar o princípio do contrário e reconhecer a importância de delegar para avançar são conhecimentos indispensáveis em ambientes competitivos e cenários desafiadores.');
    await page.type('[name="caminhoCapa"]', 'https://images-na.ssl-images-amazon.com/images/I/71ZRNxzUgGL.jpg');

    // Clica no botão "Adicionar" para adicionar o livro
    await page.click('[class="upd-btn"]');



    
    // Teste de sistema para deletar o livro que foi adicionado.
    // Acessa a página dos Dados do livro clicando no quadro do Livro "A Arte da Guerra"
    await page.click('[src="https://images-na.ssl-images-amazon.com/images/I/71ZRNxzUgGL.jpg"]');
    
    // Clica no botão "Deletar" para deletar o livro
    await page.click('[value="Deletar"]');

    // await browser.close();
})();