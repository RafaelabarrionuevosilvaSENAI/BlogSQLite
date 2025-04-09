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

const index = "<a href='/sobre'>Sobre</a> <br> <a href='/login'>Login</a> <br> <a href='/cadastro'>Cadastro</a> <br> <a href='/dashboard'>Dashboard</a> <br> <a href='/home'>Home</a> <br> <a href='/descricao'>Descricao</a>"
//const sobre = "sobre"
const login = "login"
//const cadastro = 'Vc está na página "cadastro"<br><a href="/">Voltar</a>'
const dashboard = 'vc está na página "dashboard"<br><a href="/">Voltar</a>'
const home = 'vc está na página "home"<br><a href="/">Voltar</a>'
const descricao = 'vc está na página "descrição"<br><a href="/">Voltar</a>'

app.get("/", (req, res) => {
    //res.send(index);
    console.log("GET /index");
    res.render("index")
    //res.redirect("/cadastro");
});

app.get("/sobre", (req, res) => {
console.log("GET /sobre")
    res.render("sobre");
});

app.get("/login", (req, res) => {
    console.log("GET /login")
    res.render(login);

});

app.post("/login", (req, res) => {
    console.log("POST /login")
    res.send(login);

});

app.post("/cadastro",(req, res)  => {
    console.log("POST /cadastro")

    !req.body
    ? console.log(`Body vazio: ${req.body}`)
    : console.log(JSON.stringify(req.body));

app.get("/usuarios", (req, res) => {
    const query = "SELECT * FROM users";
    db.all(query, (err, row) => {
        console.log(`GET /usuarios ${JSON.stringify(row)}`)
    res.send("Lista de usuários.")
    })
})

    const { username, password, email, celular, cpf, rg} = req.body;

  // Colocar aqui as validações e inclusao no banco de dados do cadastro do usuario
  // 1. validar cadastro
  // 2. saber se ele ja existe no banco  

    const query = "SELECT * FROM users WHERE email=? OR cpf=? OR rg? OR username=?"
    db.get(query, [email, cpf. rg. username], (err, row) => {
if(err) throw err;
console.log(`${JSON.stringify(row)}`)
if(row) {
    // a variavel 'row' irá retornar os dados do banco de dados,
    // executado através do SQL, variável query
    res.send("Usuário ja cadastrado, refaça o cadastro")
} else {
// Se o usuário não existe no banco cadastrar
const insertQuery = "INSERT INTO user(username, password, email, celular, cpf, rg) VALUES (?,?,?,?,?,?)"
db.run(
    insertQuery,
    [username, password, email, celular, cpf, rg],
    (err) => {
        if (err) throw err;
        res.send("Usuário cadastrado, com sucesso")
    }
);
}
    });
// res.send(
// `bem-vindo usúario: ${req.body.username}, seu email e ${req.body.email}`
//     )
});

app.get("/cadastro", (req, res) => {
    console.log("GET /cadastro")
    res.render("cadastro");
});

app.get("/dashboard", (req, res) => {
    console.log("GET /dashboard")
    res.send(dashboard);
});

app.get("/home", (req, res) => {
    console.log("GET /home")
    res.send(home);
});

app.get("/descricao", (req, res) => {
    console.log("GET /descricao")
    res.send(descricao);
})




app.listen(PORT, () => {
    console.log(`servidor sendo executado na porta ${PORT}`);
});
  
