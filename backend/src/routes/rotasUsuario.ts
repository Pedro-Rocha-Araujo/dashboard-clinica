import { Router } from "express"
import {
  cadastrarRecepcionista,
  logarUsuario,
  cadastrarProfissional
} from "../controllers/controllersUsuario.js"

const rotasUsuario = Router()

rotasUsuario.post("/usuario", cadastrarRecepcionista)
rotasUsuario.post("/usuario/login", logarUsuario)
rotasUsuario.post("/usuario/:profissional_id", cadastrarProfissional)

export default rotasUsuario