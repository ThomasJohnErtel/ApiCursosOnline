const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 3000;
 
mongoose.connect('mongodb+srv://thomasjohnertel:czNcQVVq4Xq0Djjt@cluster0.ghka1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));
 
const Adiçao = mongoose.model('Adiçao', {
    title: String,
    description: String,
    image_url: String,
    trailer_url: String,
});
 
app.get("/", async (req, res) => {
    const adiçao = await Adiçao.find();
    return res.send(adiçao);
});
 
app.delete("/:id", async (req, res) => {
    const adiçao = await Adiçao.findByIdAndDelete(req.params.id);
    return res.send(adiçao);
});
 
app.put("/:id", async (req, res) => {
    const adiçao = await Adiçao.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    });
    return res.send(adiçao);
});
 
app.post("/", async (req, res) => {
    try {
        const novoAdiçao = new  Adiçao({
            title: req.body.title,
            description: req.body.description,
            image_url: req.body.image_url,
            trailer_url: req.body.trailer_url
        });
        await novoAdiçao.save();  // Mover esta linha para dentro do try
        return res.status(201).send(novoAdiçao); // Mover esta linha para dentro do try
    } catch (error) {
        res.status(500).send({ message: 'Erro ao salvar o  Adiçao', error });
    }
});
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
    console.log('App Running');
});