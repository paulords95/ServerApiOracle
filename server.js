const express = require("express");
const app = express();
const port = 5000;


const {dbConnectSelect, dbConnectInsert} = require('./database')




const selectAllOS = async (req, res) => {
  const selectAll =  `select usu_numosv,usu_codeqp ,usu_deseqp from usu_t560`

  dbConnectSelect(req, res, selectAll)

}

const selectEqpByCode = async (req, res) => {
  const selectQuery = `select usu_numosv,usu_codeqp ,usu_deseqp from usu_t560 WHERE usu_codEqp = :codEqp`
  const params = req.params.codEqp

  dbConnectSelect(req, res, selectQuery, params)

}


const insertNewOS = async (req, res) => {
  const insertQuery =  `INSERT INTO usu_t560 (usu_codemp, usu_numosv, usu_codeqp, usu_deseqp) VALUES (:codEmp, (select MAX(usu_numosv) + 1 from usu_t560), :codEqp, :desEqp)`
  
  const params = {
  codEmp: req.params.codEmp,
  codEqp:  req.params.codEqp,
  desEqp: req.params.desEqp
}

dbConnectInsert(req, res, insertQuery, params.codEmp, params.codEqp, params.desEqp)

}


app.get("/", function (req, res) {
  res.send("Página inicial");
});


app.get('/api/newos/:codEmp/:codEqp/:desEqp', (req, res)=> {
  //http://localhost:5000/api/newos/23/50/rosca
  insertNewOS(req, res)
})

app.get("/api/os", function (req, res) {
  selectAllOS(req, res)
});



app.get("/api/os/:codEqp", function (req, res) {
  selectEqpByCode(req, res)
});


app.listen(port, () => console.log("Servidor rodando na porta: ", port));
