const PORT = 3000;

const express = require("express");
const path = require("path");
const app = express();
const db = require("./models");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Configuração do EJS como view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Rota principal
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// Rotas para categorias e produtos
const categoriaRouter = require("./routes/categorias");
const alunoRouter = require("./routes/alunos");
const professorRouter = require("./routes/professores");
const groupRouter = require("./routes/group");

//const produtoRouter = require("./routes/produtos");
app.use("/categorias", categoriaRouter);
app.use("/alunos", alunoRouter);
app.use("/professores", professorRouter);
app.use("/group", groupRouter);

app.get("/", (req, res) => res.send("Express on Vercel"));

// Iniciar o servidor e sincronizar com o banco de dados
db.sequelize.sync().then(() => {
    console.log("Banco de dados conectado com sucesso!");
});

module.exports = app;