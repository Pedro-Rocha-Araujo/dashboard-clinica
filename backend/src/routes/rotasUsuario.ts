import { Router } from "express"
import {
  cadastrarRecepcionista,
  logarUsuario,
  cadastrarProfissional
} from "../controllers/controllersUsuario.js"

const rotasUsuario = Router()

rotasUsuario.post("/usuario", cadastrarRecepcionista)
rotasUsuario.post("/usuario/profissional_id", cadastrarProfissional)
rotasUsuario.post("/usuario/login", logarUsuario)

export default rotasUsuario