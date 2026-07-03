import { Router } from "express"
import { 
  listarSenhas,
  novaSenha,
  encaminharPaciente,
  encerrarAtendimento
} from "../controllers/controllersSenha.js"

const rotasSenha = Router()

rotasSenha.get("/senha", listarSenhas)
rotasSenha.post("/senha", novaSenha)
rotasSenha.patch("/senha/:senha_id/encaminhamento", encaminharPaciente)
rotasSenha.patch("/senha/:senha_id", encerrarAtendimento)

export default rotasSenha