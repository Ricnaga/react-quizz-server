const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "quiz",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { nome } = req.body;
  const { email } = req.body;
  const { whatsapp } = req.body;
  const { cpf = "" } = req.body;
  const { resultado = "" } = req.body;

  let mysql =
    "INSERT INTO quizresultado ( nome, email, whatsapp, cpf, resultado) VALUES (?, ?, ?, ?, ?)";
  db.query(mysql, [nome, email, whatsapp, cpf, resultado], (err, result) => {
    res.send(result);
  });
});

app.post("/search", (req, res) => {
  const { nome } = req.body;
  const { email } = req.body;
  const { whatsapp } = req.body;
  const { cpf } = req.body;

  let mysql =
    "SELECT * from quizresultado WHERE nome = ? AND email = ? AND whatsapp = ? AND cpf = ?";
  db.query(mysql, [nome, email, whatsapp, cpf], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.get("/getQuiz", (req, res) => {
  let mysql = "SELECT * FROM quizresultado";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { nome } = req.body;
  const { email } = req.body;
  const { whatsapp } = req.body;
  const { cpf } = req.body;
  let mysql =
    "UPDATE quizresultado SET nome = ?, email = ?, whatsapp = ? WHERE id = ? WHERE cpf = ?";
  db.query(mysql, [nome, email, whatsapp, id, cpf], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM quizresultado WHERE id = ?";
  db.query(mysql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
