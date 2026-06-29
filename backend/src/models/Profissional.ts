import { Schema, model } from "mongoose"

interface Profissional {
  nome: string,
  ativo: boolean
}

const ProfissionalSchema = new Schema<Profissional>(
  {
    nome: {type: String, required: true, trim: true},
    ativo: {type: Boolean, required: true, default: true},
  }, 
  {
    timestamps: true
  }
)

const ProfissionalModel = model<Profissional>("Profissional", ProfissionalSchema)

export default ProfissionalModel