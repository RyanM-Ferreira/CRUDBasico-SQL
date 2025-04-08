const express = require("express");
const path = require("path");
const db = require("./models");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRouter = require("./routes/index");
const categoriaRouter = require("./routes/categorias");
const alunoRouter = require("./routes/alunos");
const professorRouter = require("./routes/professores");
const groupRouter = require("./routes/group");

app.use("/", indexRouter);
app.use("/categorias", categoriaRouter);
app.use("/alunos", alunoRouter);
app.use("/professores", professorRouter);
app.use("/group", groupRouter);

db.sequelize.sync()
  .then(() => {
    console.log("Banco de dados sincronizado");

    // Só inicia o servidor se estiver rodando localmente
    if (process.env.LOCAL === "true") {
      app.listen(3000, () => {
        console.log("Servidor rodando localmente na porta 3000");
      });
    }
  })
  .catch(err => {
    console.error("Erro ao sincronizar com o banco:", err);
  });

module.exports = app;