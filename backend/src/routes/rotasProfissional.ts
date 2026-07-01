import { Router } from "express"
import {
  listarProfissionais,
  profissionaisInativos,
  getProfissional,
  novoProfissional,
  desativarProfissional
} from "../controllers/controllersProfissional.js"

const rotasProfissional = Router()

rotasProfissional.get("/profissional", listarProfissionais)
rotasProfissional.get("/profissional/inativos", profissionaisInativos)
rotasProfissional.get("/profissional/:profissional_id", getProfissional)
rotasProfissional.post("/profissional", novoProfissional)
rotasProfissional.patch("/profissional/:profissional_id", desativarProfissional)

export default rotasProfissional