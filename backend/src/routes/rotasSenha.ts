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

import checarToken from "../middlewares/middlewareToken.js"

const rotasSenha = Router()   

rotasSenha.get("/senha", checarToken, listarSenhas)
rotasSenha.get("/senha/:senha_id", getSenha) 
rotasSenha.get("/senha/profissional/:profissional_id", senhasProfissional)
rotasSenha.post("/senha", checarToken, novaSenha)
rotasSenha.patch("/senha/:senha_id/encaminhamento", encaminharPaciente)
rotasSenha.patch("/senha/:senha_id", encerrarAtendimento)
rotasSenha.patch("/senha/:senha_id/cancelar", cancelarAtendimento)

export default rotasSenha