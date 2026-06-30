import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import "dotenv/config"

const app = express()
app.use(express.json())
app.use(cors())

async function conectarBanco():Promise<void> {
  try {
    const url = process.env.ROTA_BANCO
    if(!url) {
      return console.log("A url do banco não foi passada.")
    }
    await mongoose.connect(url)
    console.log("Banco conectado com sucesso!")
  } catch(erro) {
    console.log("Erro ao conectar o banco -> ", erro)
  }
}
conectarBanco()

app.listen(4000, ()=> {
  console.log("Servidor rodando!")
})