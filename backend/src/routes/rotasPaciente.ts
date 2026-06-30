import { Router } from "express"
import { listarPacientes } from "../controllers/controllersPaciente.js"

const rotasPaciente = Router()

rotasPaciente.get("/paciente", listarPacientes)

export default rotasPaciente