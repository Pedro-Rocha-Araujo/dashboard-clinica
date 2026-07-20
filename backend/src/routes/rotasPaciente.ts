import { Router } from "express"
import { 
  listarPacientes,
  getPaciente,
  deletarPaciente
} from "../controllers/controllersPaciente.js"

import checarToken from "../middlewares/middlewareToken.js"

const rotasPaciente = Router()

rotasPaciente.get("/paciente", checarToken, listarPacientes)
rotasPaciente.get("/paciente/:paciente_id", getPaciente)
rotasPaciente.delete("/paciente/:paciente_id", deletarPaciente)

export default rotasPaciente