const express = require("express");
const sqlite3 = require("sqlite3")
const PORT = 8000;

const app = express();

const db = new sqlite3.Database("user.db")
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
});

const index = "<a href=/'/sobre'>Sobre</a> <br> <a href='/login'>Login</a> <br> <a href='/cadastro'>Cadastro</a>"

const sobre = 'Vc está na página "sobre"<br><a href="/">Voltar</a>'

const login = 'Vc está na página "login"<br><a href="/">Voltar</a>'

const cadastro = 'Vc está na página "cadastro"<br><a href="/">Voltar</a>'

app.get("/", (req, res) => {
    res.send(index);
});

// Você não pode usar um mesmo ponto de rota
// app.get('/', (req, res) => {
//     res.send("olá SESI!");
// });

app.get("/sobre", (req, res) => {
    res.send(sobre);
});

app.get("/login", (req, res) => {
    res.send(login);
});

app.get("/cadastro", (req, res) => {
    res.send(cadastro);
});

app.listen(PORT, () => {
    console.log(`servidor sendo executado na porta ${PORT}`);
});
