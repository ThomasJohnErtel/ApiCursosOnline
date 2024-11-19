const express = require('express');
const cors = require('cors');
const path = require('path');
const carrinho = require('./carrinho.json'); // Importa o JSON 
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json()); // JSON
app.use(express.static(path.join(__dirname, 'public')));

const dadosCarrinho = []; // Usando  diretamente


app.get("/carrinhos", (req, res) => {
    const todosCarrinhos = [...carrinho, ...dadosCarrinho]; // Combina 
    res.json(todosCarrinhos);
});
// rota para adicionar 
app.post("/carrinhos", (req, res) => {
    const novoCarrinho = {
        id: dadosCarrinho.length + 1,
        nomeProduto: req.body.nomeProduto,
        descricao: req.body.descricao,
        quantidade: req.body.quantidade,
        preco: req.body.preco,
        imagem: req.body. imagem 
    };
    dadosCarrinho.push(novoCarrinho);
    res.status(201).json(novoCarrinho);
});


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
