const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 3000;
const path = require('path');

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://thomasjohnertel:1234567890@projetofinalweb.8j1ji.mongodb.net/?retryWrites=true&w=majority&appName=ProjetoFinalWeb)')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));


const Avaliacoes = mongoose.model('Avaliacoes', {
    nome: String,
    descricao: String,
    questoes: String,
    pontuacao_maxima: String,
    duracao: String,
    data_inicio: String,
});



app.get("/api/avaliacoes", async (req, res) => {
    try {
        const avaliacoes = await Avaliacoes.find();
        return res.json(avaliacoes);
    } catch (error) {
        return res.status(500).send({ message: 'Erro ao buscar avaliações', error });
    }
});

app.post("/api/avaliacoes", async (req, res) => {
    try {
        if (!req.body.nome || !req.body.descricao || !req.body.questoes || !req.body.pontuacao_maxima || !req.body.duracao || !req.body.data_inicio) {
            return res.status(400).send({ message: 'Todos os campos são obrigatórios.' });
        }

        const novaAvaliacao = new Avaliacoes({
            nome: req.body.nome,
            descricao: req.body.descricao,
            questoes: req.body.questoes,
            pontuacao_maxima: req.body.pontuacao_maxima,
            duracao: req.body.duracao,
            data_inicio: req.body.data_inicio
        });
        await novaAvaliacao.save();
        return res.status(201).send(novaAvaliacao);
    } catch (error) {
        console.error('Erro ao salvar avaliação:', error);  
        return res.status(500).send({ message: 'Erro ao salvar a avaliação', error: error.message || error });
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log('App Running');
});