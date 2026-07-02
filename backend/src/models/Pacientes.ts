import { Schema, model } from "mongoose"

interface Paciente {
  nome:string,
  cpf:number,
  telefone:number
}

const PacienteSchema = new Schema<Paciente>(
  {
    nome: {type: String, required: true, trim: true},
    cpf: {type: Number, required: true, trim: true},
    telefone: {type: Number, required: true, trim: true},
  },
  {
    timestamps: true
  }
)

const PacienteModel = model("Paciente", PacienteSchema)

export default PacienteModel