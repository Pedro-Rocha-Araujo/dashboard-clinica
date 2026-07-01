import { Schema, model, Types } from "mongoose"

interface Profissional {
  nome: string,
  ativo: boolean,
  especialidade: Types.ObjectId
}

const ProfissionalSchema = new Schema<Profissional>(
  {
    nome: {type: String, required: true, trim: true},
    ativo: {type: Boolean, required: true, default: true},
    especialidade: {
      type: Schema.Types.ObjectId,
      ref: "Especialidade",
      required: true
    }
  }, 
  {
    timestamps: true
  }
)

const ProfissionalModel = model<Profissional>("Profissional", ProfissionalSchema)

export default ProfissionalModel