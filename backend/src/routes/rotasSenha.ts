import { Router } from "express"
import { 
  listarSenhas,
  getSenha,
  senhasProfissional,
  novaSenha,
  encaminharPaciente,
  encerrarAtendimento,
  cancelarAtendimento
} from "../controllers/controllersSenha.js"

import { checarToken } from "../middlewares/middlewareToken.js"

const rotasSenha = Router()   

rotasSenha.get("/senha", checarToken, listarSenhas)
rotasSenha.get("/senha/:senha_id", checarToken, getSenha) 
rotasSenha.get("/senha/profissional/:profissional_id", checarToken, senhasProfissional)
rotasSenha.post("/senha", checarToken, novaSenha)
rotasSenha.patch("/senha/:senha_id/encaminhamento", checarToken, encaminharPaciente)
rotasSenha.patch("/senha/:senha_id", checarToken, encerrarAtendimento)
rotasSenha.patch("/senha/:senha_id/cancelar", checarToken, cancelarAtendimento)

export default rotasSenha