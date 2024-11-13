const express = require('express'); 
const bcrypt = require('bcrypt'); 
const path = require('path'); 
const app = express(); 
const PORT = 8080;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));

const usuarios = [
    { id: 1, nome: 'UsuarioTeste', email: 'usuario@teste.com', senha:
    bcrypt.hashSync('senha123', 10) }
    ];

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
    });

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send('Usuário, Email e senha são obrigatórios.');
    }

    const usuario = usuarios.find(u => u.email === email);

    if (!usuario) {
        return res.status(401).send('Usuário não encontrado.');
        }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
        return res.status(401).send('Senha inválida.');
    }

    res.redirect('/sucesso.html');
    });

    app.listen(PORT, () => {
        console.log(`Servidor rodando em
        http://localhost:${PORT}`);
        });