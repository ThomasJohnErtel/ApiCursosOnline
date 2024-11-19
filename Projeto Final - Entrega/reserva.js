const express = require('express');
const cors = require('cors');
const path = require('path');
const reserva = require('./reserva.json'); // JSON 
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json()); // JSON
app.use(express.static(path.join(__dirname, 'public')));

const dadosReserva = []; 


app.get("/reservas", (req, res) => {
    const todosReservas = [...reserva, ...dadosReserva]; //JSON com dados
    res.json(todosReservas);
});

app.post("/reservas", (req, res) => {
    const novoReserva = {
        id: dadosReserva.length + 1,
        nomeDoAluno: req.body. nomeDoAluno,
        emailDoAluno: req.body.emailDoAluno,
        dataDaReserva: req.body.dataDaReserva,
        horario: req.body.horario,
        duracao: req.body. duracao 
    };


    dadosReserva.push(novoReserva);
    res.status(201).json(novoReserva);
});

// excluir  item 
app.delete("/reservas/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = dadosReserva.findIndex(item => item.id === id);

    if (index !== -1) {
        dadosReserva.splice(index, 1);
        res.status(200).json({ message: "Item excluído ." });
    } else {
        res.status(404).json({ message: "O seu Item não encontrado." });
    }
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reserva.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor em execução em http://localhost:${PORT}`);
});
