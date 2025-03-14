const express = require("express");

const PORT = 8000;

const app = express();

app.get('/', (req, res) => {
    res.send("olá SESI!");
});

app.listen(PORT, () => {
    console.log(`servidor sendo executado na porta ${PORT}`);
});
