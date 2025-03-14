const express = require("express");

const PORT = 8000;

const app = express();

const index = "<a href=/'/sobre'>Sobre</a><a href='/info'>Info</a>"


app.get("/", (req, res) => {
res.send(index);
});

app.get('/', (req, res) => {
    res.send("olá SESI!");
});

app.get("/sobre", (req, res) => {
    res.send("Vc está na página Sobre");
});

app.get("/info", (req, res) => {
    res.send("Vc está na página info");
});

app.listen(PORT, () => {
    console.log(`servidor sendo executado na porta ${PORT}`);
});
