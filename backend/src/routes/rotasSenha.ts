import { Router } from "express"
import { 
  listarSenhas,
  getSenha,
  senhasProfissional,
  novaSenha,
  encaminharPaciente,
  encerrarAtendimento,
  cancelarAtendimento,
} from "../controllers/controllersSenha.js"

const rotasSenha = Router()

rotasSenha.get("/senha", listarSenhas)
rotasSenha.get("/senha/:senha_id", getSenha) 
rotasSenha.get("/senha/profissional/:profissional_id", senhasProfissional)
rotasSenha.post("/senha", novaSenha)
rotasSenha.patch("/senha/:senha_id/encaminhamento", encaminharPaciente)
rotasSenha.patch("/senha/:senha_id", encerrarAtendimento)
rotasSenha.patch("/senha/:senha_id/cancelar", cancelarAtendimento)

export default rotasSenha