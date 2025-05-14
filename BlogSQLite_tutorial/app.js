const express = require("express");
const sqlite3 = require("sqlite3");
//const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
const db = new sqlite3.Database("user.db")
let config = { titulo: "", rodape: "" }

const PORT = 8000;

db.serialize(() => {
    //este método permite enviar comandos SQL em modo 'sequencial'
    db.run(
        `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, 
       email TEXT, celular TEXT, cpf TEXT, rg TEXT)`
    );
});

// configuração para uso de sessão (cookies) com express
app.use(
    session({
        secret: "qualquersenha",
        resave: true,
        saveUninitialized: true,
    })
);

// _dirname é a variável interna do nodejs que guarda o caminho absoluto do projeyo, no 50
// console.log(_dirname +"/static")

//aqui será acrescentado uma rota "/static", para a pasta _dinarme + "/static"
//O app.use é usado para acrescentar rotas novas para o Express gerenciar e pode usar
//Middleware para isto, que nesse caso é o express.static que gerencia rotas estaticas
app.use("/static", express.static(__dirname + "/static"))

app.use(express.urlencoded({ extended: true }));

// configurar EJS como o motor de visualização 
app.set("view engine", "ejs")

const index = "<a href='/sobre'>Sobre</a> <br> <a href='/login'>Login</a> <br> <a href='/cadastro'>Cadastro</a> <br> <a href='/dashboard'>Dashboard</a> <br> <a href='/home'>Home</a> <br> <a href='/descricao'>Descricao</a>"
//const sobre = "sobre"
const login = "login"
//const cadastro = 'Vc está na página "cadastro"<br><a href="/">Voltar</a>'
const dashboard = "dashboard"
const home = 'vc está na página "home"<br><a href="/">Voltar</a>'
const descricao = 'vc está na página "descrição"<br><a href="/">Voltar</a>'

app.get("/", (req, res) => {
    //res.send(index);
    console.log("pages/index", config);
    // res.render("pages/index", { titulo: "Blog da turma I2HNA - SESI Nova Odessa" })
    res.render("pages/index");
});

app.get("/sobre", (req, res) => {
    console.log("pages/sobre", config)
    res.render("pages/sobre");
});



app.get("/login", (req, res) => {
    console.log("pages/login", config)
    res.render("pages/login");
});

app.post("/login", (req, res) => {
    console.log("POST /login", config)
    const { username, password } = req.body
    console.log(`req.body: ${JSON.stringify(req.body)}`)



    // Consultar o usuario no banco de dados
    const query = "SELECT * FROM users WHERE username=? AND password=?"
    db.get(query, [username, password], (err, row) => {
        if (err) throw err;
        console.log(`SELECT LOGIN: ${row}`)
        // Se usuario válido -> registra a sessão e redireciona para o dashboard
        if (row) {
            req.session.loggedin = true;
            req.session.username = username
            res.redirect("/dashboard")
        }
        // Se não, envia a mensagem de erro (Usuário Invalido)
        else {
            res.send("Usuário invalido.")
        }
    });
});

app.get("/usuarios", (req, res) => {
    const query = "SELECT * FROM users";
    db.all(query, (err, row) => {
        console.log(`pages /usuarios ${JSON.stringify(row)}`)
        res.send("Lista de usuários.")
    })
})

app.get("/dashboard", (req, res) => {
    console.log("GET /dashboard");
    console.log(`${JSON.stringify(config)}`);

if (req.session.loggedin) {
db.all("SELECT * FROM users", [], (err, row) => {
    if (err)throw err;  
    res.render("pages/dashboard", {titulo: "DASHBOARD", dados: row, rq: req })
})
} else {
console.log("Tentativa de acesso a àrea restrista")
res.redirect
}
})


app.post("/cadastro", (req, res) => {
    console.log("POST /cadastro")

    !req.body
        ? console.log(`Body vazio: ${req.body}`)
        : console.log(JSON.stringify(req.body));


    const { username, password, email, celular, cpf, rg } = req.body;

    // Colocar aqui as validações e inclusao no banco de dados do cadastro do usuario
    // 1. validar cadastro
    // 2. saber se ele ja existe no banco  

    const query = "SELECT * FROM users WHERE username=? AND email=?";
    db.get(query, [username, email], (err, row) => {
        if (err) throw err;
        // console.log(`${JSON.stringify(row)}`)
        if (row) {
            // a variavel 'row' irá retornar os dados do banco de dados,
            // executado através do SQL, variável query
            res.send("Usuário ja cadastrado, refaça o cadastro")
        } else {
            // Se o usuário não existe no banco cadastrar
            const insertQuery = "INSERT INTO users(username, password, email, celular, cpf, rg) VALUES (?,?,?,?,?,?)";
            db.run(
                insertQuery,
                [username, password, email, celular, cpf, rg],
                (err) => {
                    if (err) throw err;
                    res.send("Usuário cadastrado, com sucesso")
                });
        }
    });
    // res.send(
    // `bem-vindo usúario: ${req.body.username}, seu email e ${req.body.email}`
    //     )
});

app.get("/cadastro", (req, res) => {
    console.log("pages /cadastro")
    res.render("pages/cadastro");
});

// app.get("/dashboard", (req, res) => {
//     console.log("GET /dashboard")
//     res.send(dashboard);
//});

app.get("/home", (req, res) => {
    console.log("pages /home")
    res.send(home);
});

app.get("/descricao", (req, res) => {
    console.log("pages /descricao")
    res.send(descricao);
})

app.get("/logout", (req, res) => {
    // Exemplo de uma rota (END POINT) controlado pela sessão do usuário logado.
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
  
  app.use('*', (req, res) => {
    // Envia uma resposta de erro 404
    res.status(404).render('pages/404', { ...config, req: req});
});



app.listen(PORT, () => {
    console.log(`servidor sendo executado na porta ${PORT}`);
});



