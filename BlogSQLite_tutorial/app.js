const express = require("express");
const sqlite3 = require("sqlite3");
const PORT = 8000;
const app = express();
const db = new sqlite3.Database("user.db")
const bodyParser = require("body-parser")

db.serialize(() => {
//este método permite enviar comandos SQL em modo 'sequencial'
    db.run(
       `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, 
       email TEXT, celular TEXT, cpf TEXT, rg TEXT)`
    );
});

// _dirname é a variável interna do nodejs que guarda o caminho absoluto do projeyo, no 50
// console.log(_dirname +"/static")

//aqui será acrescentado uma rota "/static", para a pasta _dinarme + "/static"
//O app.use é usado para acrescentar rotas novas para o Express gerenciar e pode usar
//Middleware para isto, que nesse caso é o express.static que gerencia rotas estaticas
app.use("/static", express.static(__dirname + "/static"))

app.use(bodyParser.urlencoded({ extended: true}));

// configurar EJS como o motor de visualização 
app.set("view engine", "ejs")

// const index = "<a href='/sobre'>Sobre</a> <br> <a href='/login'>Login</a> <br> <a href='/cadastro'>Cadastro</a> <br> <a href='/dashboard'>Dashboard</a> <br> <a href='/home'>Home</a> <br> <a href='/descricao'>Descricao</a>"
// const sobre = 'Vc está na página "sobre"<br><a href="/">Voltar</a>'
// const login = 'Vc está na página "login"<br><a href="/">Voltar</a>'
// const cadastro = 'Vc está na página "cadastro"<br><a href="/">Voltar</a>'
// const dashboard = 'vc está na página "dashboard"<br><a href="/">Voltar</a>'
// const home = 'vc está na página "home"<br><a href="/">Voltar</a>'
// const descricao = 'vc está na página "descrição"<br><a href="/">Voltar</a>'

app.get("/", (req, res) => {
   // res.send(index);
    res.render("index");
});

// Você não pode usar um mesmo ponto de rota
// app.get('/', (req, res) => {
//     res.send("olá SESI!");
// });



app.get("/sobre", (req, res) => {
    res.send(sobre);
});

app.get("/login", (req, res) => {
    res.render(login);

});

app.post("/cadastro", (req, res) => {
    res.sender(cadastro)
})

app.post("/cadastro",(req, res)  => {
    req.body
    ? console.log(JSON.stringify(req.body))
    : console.log(`Body vazio: ${req.body}`);

    res.send(
`bem-vindo usúario: ${req.body.username}, seu email e ${req.body.email}`
    )
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


