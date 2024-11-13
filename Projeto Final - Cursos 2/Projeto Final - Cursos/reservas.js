const express = require('express');
const cors = require('cors');
const path = require('path');
const reserva = require('./reserva.json'); // Importa o JSON de auditoria
const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json()); // JSON
app.use(express.static(path.join(__dirname, 'public')));

const dadosReserva = [];

app.get('/reservas', (req, res) => {
    res.json(reserva); 
});


app.get("/reservas", (req, res) => {
    res.json(dadosReserva);
});


app.post("/reservas", (req, res) => {
    const novoReserva = {
        id: dadosReserva.length + 1,
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    };
    dadosReserva.push(novoReserva);
    res.status(201).json(novoReserva);
});


app.delete("/reservas/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = dadosReserva.findIndex(item => item.id === id);

    if (index !== -1) {
        dadosReserva.splice(index, 1);
        res.status(200).json({ message: "Item excluído com sucesso." });
    } else {
        res.status(404).json({ message: "Item não encontrado." });
    }
});

//  página HTML 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reservas.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor em execução em http://localhost:${PORT}`);
});