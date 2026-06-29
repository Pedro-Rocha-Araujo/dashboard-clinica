import { Schema, model, Types } from "mongoose"

interface Senha {
  numero:string,
  paciente:Types.ObjectId,
  status: "Aguardando" | "NaFila" | "Atendido" | "Finalizado",
  profissional:Types.ObjectId
}

const SenhaSchema = new Schema<Senha>(
  {
    numero: {type: String, required: true},
    paciente: {
      type: Schema.Types.ObjectId,
      ref: "Paciente",
      required: true
    },
    status: {
      type: String,
      enum: ["Aguardando", "NaFila", "Atendido", "Finalizado"], 
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