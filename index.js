const express  = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/batabase");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
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
    Pergunta.findAll({raw: true, order: [
        ['id', 'DESC'] // ASC = CRESCENTE ||| DESC = DECRESCENTE
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
    
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
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){ //Pergunta foi encontrada

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['id', 'DESC']
            ]
                }).then(respostas => {
                    res.render("pergunta",{
                        pergunta: pergunta,
                        respostas: respostas
                    });
                });
            } else { //Pergunta não foi encontrada
                res.redirect("/");
            }
    })
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });

});

app.listen(8080, ()=>{console.log("app rodando");});