import { Schema, model } from "mongoose"

const UsuarioSchema = new Schema({
  usuario: { type: String, required: true, unique: true, trim: true },
  senha: { type: String, required: true },
  tipo: { type: String, enum: ["PROFISSIONAL", "RECEPCAO"], default: "RECEPCAO" },
  profissional: {
    type: Schema.Types.ObjectId,
    ref: "Profissional",
    required: false,
  }
})

const UsuarioModel = model("Usuario", UsuarioSchema)

export default UsuarioModel