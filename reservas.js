const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 3000;
 
mongoose.connect('mongodb+srv://thomasjohnertel:czNcQVVq4Xq0Djjt@cluster0.ghka1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));
 
const Reservas = mongoose.model('Reservas', {
    title: String,
    description: String,
    image_url: String,
    trailer_url: String,
});
 
app.get("/", async (req, res) => {
    const reservas = await Reservas.find();
    return res.send(reservas);
});
 
app.delete("/:id", async (req, res) => {
    const reservas = await Reservas.findByIdAndDelete(req.params.id);
    return res.send(reservas);
});
 
app.put("/:id", async (req, res) => {
    const reservas = await Reservas.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    });
    return res.send(reservas);
});
 
app.post("/", async (req, res) => {
    try {
        const novoReservas = new Reservas({
            title: req.body.title,
            description: req.body.description,
            image_url: req.body.image_url,
            trailer_url: req.body.trailer_url
        });
        await novoReservas.save();  // Mover esta linha para dentro do try
        return res.status(201).send(novoReservas); // Mover esta linha para dentro do try
    } catch (error) {
        res.status(500).send({ message: 'Erro ao salvar o Reservas', error });
    }
});
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
    console.log('App Running');
});