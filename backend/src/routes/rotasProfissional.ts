import { Router } from "express"
import {
  listarProfissionais,
  profissionaisInativos,
  getProfissional,
  novoProfissional
} from "../controllers/controllersProfissional.js"

const rotasProfissional = Router()

rotasProfissional.get("/profissional", listarProfissionais)
rotasProfissional.get("/profissional/inativos", profissionaisInativos)
rotasProfissional.get("/profissional/:profissional_id", getProfissional)
rotasProfissional.post("/profissional", novoProfissional)


export default rotasProfissional