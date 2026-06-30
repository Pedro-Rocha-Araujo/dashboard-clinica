import express from "express"
import cors from "cors"
import { connect } from "mongoose"
import "dotenv/config"
// Imports dos Routers
import rotasPaciente from "./routes/rotasPaciente.js"
import rotasProfissional from "./routes/rotasProfissional.js"
import rotasSenha from "./routes/rotasSenha.js"

const app = express()
app.use(express.json())
app.use(cors())
app.use(rotasPaciente)
app.use(rotasProfissional)
app.use(rotasSenha)

async function conectarBanco():Promise<void> {
  try {
    const url = process.env.ROTA_BANCO
    if(!url) {
      console.log("A url do banco não foi passada.")
      return 
    }
    await connect(url)
    console.log("Banco conectado com sucesso!")
  } catch(erro) {
    console.log("Erro ao conectar o banco -> ", erro)
  }
}
conectarBanco()

app.listen(process.env.PORTA, ()=> {
  console.log("Servidor rodando!")
})