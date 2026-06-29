import { Schema, model } from "mongoose"

interface Paciente {
  nome:string,
  cpf:string,
  telefone:string
}

const PacienteSchema = new Schema<Paciente>(
  {
    nome: {type: String, required: true, trim: true},
    cpf: {type: String, required: true, trim: true},
    telefone: {type: String, required: true, trim: true},
  },
  {
    timestamps: true
  }
)

const PacienteModel = model("Paciente", PacienteSchema)

export default PacienteModel