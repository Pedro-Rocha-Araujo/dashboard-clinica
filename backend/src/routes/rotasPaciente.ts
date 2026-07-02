import { Router } from "express"
import { 
  listarPacientes,
  getPaciente,
  novoPaciente,
  deletarPaciente
} from "../controllers/controllersPaciente.js"

const rotasPaciente = Router()

rotasPaciente.get("/paciente", listarPacientes)
rotasPaciente.get("/paciente/:paciente_id", getPaciente)
rotasPaciente.post("/paciente", novoPaciente)
rotasPaciente.delete("/paciente/:paciente_id", deletarPaciente)

export default rotasPaciente