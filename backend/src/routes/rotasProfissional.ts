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

import checarToken from "../middlewares/middlewareToken.js"

const rotasProfissional = Router()

rotasProfissional.get("/profissional", checarToken, listarProfissionais)
rotasProfissional.get("/profissional/inativos", checarToken, profissionaisInativos)
rotasProfissional.get("/profissional/:profissional_id", checarToken, getProfissional)
rotasProfissional.put("/profissional/:profissional_id", checarToken, editarProfissional)
rotasProfissional.post("/profissional", checarToken, novoProfissional)
rotasProfissional.patch("/profissional/:profissional_id", checarToken, desativarProfissional)
rotasProfissional.patch("/profissional/ativar/:profissional_id", checarToken, ativarProfissional)

export default rotasProfissional