import { Schema, model, Types } from "mongoose"

interface Senha {
  numero:number,
  paciente:Types.ObjectId,
  status: "Aguardando" | "NaFila" | "Atendido" | "Finalizado",
  profissional:Types.ObjectId
}

const SenhaSchema = new Schema<Senha>(
  {
    numero: {type: Number, required: true},
    paciente: {
      type: Schema.Types.ObjectId,
      ref: "Paciente",
      required: true
    },
    status: {
      type: String,
      enum: ["Aguardando", "NaFila", "Finalizado", "Cancelado"], 
      default: "Aguardando", 
      required: true
    },
    profissional: {
      type: Schema.Types.ObjectId,
      ref: "Profissional",
    }
  },
  {
    timestamps: true
  }
)

const SenhaModel = model<Senha>("Senha", SenhaSchema)

export default SenhaModel