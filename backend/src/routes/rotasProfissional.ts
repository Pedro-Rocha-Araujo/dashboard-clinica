import { Router } from "express"
import {
  listarProfissionais,
  profissionaisInativos,
  getProfissional,
  editarProfissional,
  novoProfissional,
  desativarProfissional,
  ativarProfissional
} from "../controllers/controllersProfissional.js"

const rotasProfissional = Router()

rotasProfissional.get("/profissional", listarProfissionais)
rotasProfissional.get("/profissional/inativos", profissionaisInativos)
rotasProfissional.get("/profissional/:profissional_id", getProfissional)
rotasProfissional.put("/profissional/:profissional_id", editarProfissional)
rotasProfissional.post("/profissional", novoProfissional)
rotasProfissional.patch("/profissional/:profissional_id", desativarProfissional)
rotasProfissional.patch("/profissional/ativar/:profissional_id", ativarProfissional)

export default rotasProfissional