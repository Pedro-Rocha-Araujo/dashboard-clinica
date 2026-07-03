import { Router } from "express"
import { 
  listarSenhas,
  novaSenha,
  encaminharPaciente
} from "../controllers/controllersSenha.js"

const rotasSenha = Router()

rotasSenha.get("/senha", listarSenhas)
rotasSenha.post("/senha", novaSenha)
rotasSenha.patch("/senha/:senha_id/encaminhamento", encaminharPaciente)

export default rotasSenha