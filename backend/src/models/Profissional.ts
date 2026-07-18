import { Schema, model, Types } from "mongoose"

interface Profissional {
  nome: string,
  ativo: boolean,
  especialidade: string,
  cadastrado: boolean
}

const ProfissionalSchema = new Schema<Profissional>(
  {
    nome: {type: String, required: true, trim: true},
    ativo: {type: Boolean, required: true, default: true},
    especialidade: {type: String, required: true, trim: true},
    cadastrado: {type: Boolean, default: true}
  }, 
  {
    timestamps: true
  }
)

const ProfissionalModel = model<Profissional>("Profissional", ProfissionalSchema)

export default ProfissionalModel