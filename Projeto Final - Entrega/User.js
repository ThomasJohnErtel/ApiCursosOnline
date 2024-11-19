const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


const usuarios = [
    { id: 1, nome: 'UsuarioTeste', email: 'usuario@teste.com', senha: bcrypt.hashSync('senha123', 10) }
];

const admins = [
    { id: 2, nome: 'UsuarioAdmin', email: 'admin@teste.com', senha: bcrypt.hashSync('senha123', 10) }
];


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send('Email e senha são obrigatórios.');
    }

    
    let usuario = usuarios.find(u => u.email === email);
    let tipo = 'usuario';

    if (!usuario) {
        usuario = admins.find(a => a.email === email);
        tipo = 'admin';
    }

    
    if (!usuario) {
        return res.status(401).send('Usuário não encontrado.');
    }

   
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
        return res.status(401).send('Senha inválida.');
    }

    
    if (tipo === 'usuario') {
        return res.redirect('/carrinho.html');
    } else if (tipo === 'admin') {
        return res.redirect('/courses.html');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
