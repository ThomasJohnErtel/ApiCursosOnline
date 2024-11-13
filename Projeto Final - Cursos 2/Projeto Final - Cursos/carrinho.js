const express = require('express');
const cors = require('cors');
const path = require('path');
const carrinho = require('./carrinho.json'); // Importa o JSON de auditoria
const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json()); // JSON
app.use(express.static(path.join(__dirname, 'public')));

const dadosCarrinho = carrinho; // Usando o carrinho.json diretamente

// Rota para listar os itens do carrinho
app.get("/carrinhos", (req, res) => {
    res.json(dadosCarrinho); // Retorna o array de carrinho
});

// Rota para adicionar um novo item ao carrinho
app.post("/carrinhos", (req, res) => {
    const novoCarrinho = {
        id: dadosCarrinho.length + 1,
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url,
        price: req.body.price // Adicionando o preço ao item
    };
    dadosCarrinho.push(novoCarrinho);
    res.status(201).json(novoCarrinho);
});

// Rota para excluir um item do carrinho
app.delete("/carrinhos/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = dadosCarrinho.findIndex(item => item.id === id);

    if (index !== -1) {
        dadosCarrinho.splice(index, 1);
        res.status(200).json({ message: "Item excluído com sucesso." });
    } else {
        res.status(404).json({ message: "Item não encontrado." });
    }
});

// Página inicial
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'carrinho.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor em execução em http://localhost:${PORT}`);
});
