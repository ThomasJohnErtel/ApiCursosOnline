const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 3000;
 
mongoose.connect('mongodb+srv://thomasjohnertel:czNcQVVq4Xq0Djjt@cluster0.ghka1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));
 
const Carrinho = mongoose.model('Carrinho', {
    title: String,
    description: String,
    image_url: String,
    trailer_url: String,
});
 
app.get("/", async (req, res) => {
    const carrinho = await Carrinho.find();
    return res.send(carrinho);
});
 
app.delete("/:id", async (req, res) => {
    const carrinho = await Carrinho.findByIdAndDelete(req.params.id);
    return res.send(carrinho);
});
 
app.put("/:id", async (req, res) => {
    const carrinho = await Carrinho.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    });
    return res.send(carrinho);
});
 
app.post("/", async (req, res) => {
    try {
        const novoCarrinho = new Curso({
            title: req.body.title,
            description: req.body.description,
            image_url: req.body.image_url,
            trailer_url: req.body.trailer_url
        });
        await novoCarrinho.save();  // Mover esta linha para dentro do try
        return res.status(201).send(novoCarrinho); // Mover esta linha para dentro do try
    } catch (error) {
        res.status(500).send({ message: 'Erro ao salvar o Carrinho', error });
    }
});
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
    console.log('App Running');
});