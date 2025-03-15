const express = require("express");
const sqlite3 = require("sqlite3")
const PORT = 8000;

const app = express();

const db = new sqlite3.Database("user.db")
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
});

const index = "<a href='/sobre'>Sobre</a> <br> <a href='/login'>Login</a> <br> <a href='/cadastro'>Cadastro</a> <br> <a href='/dashboard'>Dashboard</a> <br> <a href='/home'>Home</a> <br> <a href='/descricao'>Descricao</a>"

const sobre = 'Vc está na página "sobre"<br><a href="/">Voltar</a>'

const login = 'Vc está na página "login"<br><a href="/">Voltar</a>'

const cadastro = 'Vc está na página "cadastro"<br><a href="/">Voltar</a>'

const dashboard = 'vc está na página "dashboard"<br><a href="/">Voltar</a>'

const home = 'vc está na página "home"<br><a href="/">Voltar</a>'

const descricao = 'vc está na página "descrição"<br><a href="/">Voltar</a>'

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

app.get("/dashboard", (req, res) => {
    res.send(dashboard);
});

app.get("/home", (req, res) => {
    res.send(home);
});

app.get("/descricao", (req, res) => {
    res.send(descricao);
})

app.listen(PORT, () => {
    console.log(`servidor sendo executado na porta ${PORT}`);
});

