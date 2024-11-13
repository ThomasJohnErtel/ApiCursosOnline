const express = require('express');
const cors = require('cors');
const path = require('path');
const auditoria = require('./auditoria.json'); // Importa o JSON de auditoria
const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json()); // JSON
app.use(express.static(path.join(__dirname, 'public')));

const dadosAuditoria = [];

app.get('/auditoria', (req, res) => {
    res.json(auditoria); 
});


app.get("/auditorias", (req, res) => {
    res.json(dadosAuditoria);
});


app.post("/auditorias", (req, res) => {
    const novoAuditoria = {
        id: dadosAuditoria.length + 1,
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    };
    dadosAuditoria.push(novoAuditoria);
    res.status(201).json(novoAuditoria);
});


app.delete("/auditorias/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = dadosAuditoria.findIndex(item => item.id === id);

    if (index !== -1) {
        dadosAuditoria.splice(index, 1);
        res.status(200).json({ message: "Item excluído com sucesso." });
    } else {
        res.status(404).json({ message: "Item não encontrado." });
    }
});

//  página HTML 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'auditoria.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor em execução em http://localhost:${PORT}`);
});