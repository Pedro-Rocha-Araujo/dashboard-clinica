import type { Profissional } from "./interfacesProfissional.js"

export interface UsuarioBody {
  usuario: string,
  senha: string,
  profissional: Profissional
}