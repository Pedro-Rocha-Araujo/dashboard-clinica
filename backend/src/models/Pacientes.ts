import { Schema, model } from "mongoose"
import type { Paciente } from "../interfaces/interfacesPaciente.js"


const PacienteSchema = new Schema<Paciente>(
  {
    nome: {type: String, required: true, trim: true},
    cpf: {type: Number, trim: true},
    telefone: {type: Number, trim: true},
  },
  {
    timestamps: true
  }
)

const PacienteModel = model("Paciente", PacienteSchema)

export default PacienteModel