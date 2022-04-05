const express  = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/batabase")
const Pergunta = require("./database/Pergunta")
//DATABASE

connection
    .authenticate()
    .then(() =>{
        console.log("Conexão feita com sucesso");
    })
    .catch((msgerro) =>{
        console.log("Um erro inesperado");
    })

// ESTOU DIZENDO PARA O EXPRESS USAR O EJS COMO VIEW ENGINE
app.set('view engine', 'ejs');
app.use(express.static('public'));
//COMANDO PARA O BODY PARSER LÊ OS DADOS
app.use(bodyParser.urlencoded({extended: false}));
//COMANDO PARA O BODY PARSER TRANSFORMAR EM JSON LÁ NA API
app.use(bodyParser.json());
// ROTAS
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    });
});

app.listen(8080, ()=>{console.log("app rodando");});