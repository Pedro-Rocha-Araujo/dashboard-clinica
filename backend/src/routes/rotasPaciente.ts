import { Router } from "express"
import { 
  listarPacientes,
  getPaciente,
  deletarPaciente
} from "../controllers/controllersPaciente.js"

const rotasPaciente = Router()

rotasPaciente.get("/paciente", listarPacientes)
rotasPaciente.get("/paciente/:paciente_id", getPaciente)
rotasPaciente.delete("/paciente/:paciente_id", deletarPaciente)

export default rotasPaciente