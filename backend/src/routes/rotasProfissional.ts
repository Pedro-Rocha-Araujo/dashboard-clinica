import { Router } from "express"
import { listarProfissionais } from "../controllers/controllersProfissional.js"

const rotasProfissional = Router()

rotasProfissional.get("/profissional", listarProfissionais)

export default rotasProfissional