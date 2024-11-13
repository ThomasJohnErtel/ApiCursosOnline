const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 3000;
const path = require('path');

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://thomasjohnertel:1234567890@cluster2.2gmp2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Modelos
const Cursos = mongoose.model('Cursos', {
    codigo: String,
    identificacao: String,
    preco: String,
    condicoes_pagamento: String,
    especificacoes: String,
    imagem: String,
    preco_domicilio: String,
    preco_loja: String,
});

const Avaliações = mongoose.model('Produto', {
    codigo: String,
    identificacao: String,
    preco: String,
    condicoes_pagamento: String,
    especificacoes: String,
    imagem: String,
});


// Rotas para Cursos
app.get("/api/cursos", async (req, res) => {
    try {
        const cursos = await Curso.find();
        return res.json(cursos);
    } catch (error) {
        return res.status(500).send({ message: 'Erro ao buscar cursos', error });
    }
});

app.get("/api/avaliacoes", async (req, res) => {
    try {
        const avaliacoes = await Avaliacao.find();
        return res.json(avaliacoes);
    } catch (error) {
        return res.status(500).send({ message: 'Erro ao buscar avaliações', error });
    }
});



app.post("/api/lojas", async (req, res) => {
    try {
        const novoLoja = new Loja({
            codigo: req.body.codigo,
            identificacao: req.body.identificacao,
            preco: req.body.preco,
            condicoes_pagamento: req.body.condicoes_pagamento,
            especificacoes: req.body.especificacoes,
            imagem: req.body.imagem,
            preco_domicilio: req.body.preco_domicilio,
            preco_loja: req.body.preco_loja
        });
        await novoLoja.save();
        return res.status(201).send(novoLoja);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao salvar a loja', error });
    }
});

app.delete("/api/lojas/:id", async (req, res) => {
    const loja = await Loja.findByIdAndDelete(req.params.id);
    return res.send(loja);
});

app.put("/api/lojas/:id", async (req, res) => {
    const loja = await Loja.findByIdAndUpdate(req.params.id, {
        codigo: req.body.codigo,
        identificacao: req.body.identificacao,
        preco: req.body.preco,
        condicoes_pagamento: req.body.condicoes_pagamento,
        especificacoes: req.body.especificacoes,
        imagem: req.body.imagem,
        preco_domicilio: req.body.preco_domicilio,
        preco_loja: req.body.preco_loja
    }); 
    return res.send(loja);
});


app.get("/api/produtos", async (req, res) => {
    const produtos = await Produto.find();
    return res.json(produtos);
});

app.post("/api/produtos", async (req, res) => {
    try {
        const novoProduto = new Produto({
            codigo: req.body.codigo,
            identificacao: req.body.identificacao,
            preco: req.body.preco,
            condicoes_pagamento: req.body.condicoes_pagamento,
            especificacoes: req.body.especificacoes,
            imagem: req.body.imagem,
        });
        await novoProduto.save();
        return res.status(201).send(novoProduto);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao salvar o produto', error });
    }
});

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Inicializando o servidor
app.listen(port, () => {
    console.log('App Running');
});