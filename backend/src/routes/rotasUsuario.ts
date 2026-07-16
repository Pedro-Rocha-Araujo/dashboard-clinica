import { Router } from "express"
import {
  cadastrarRecepcionista,
  logarUsuario
} from "../controllers/controllersUsuario.js"

const rotasUsuario = Router()

rotasUsuario.post("/usuario", cadastrarRecepcionista)
rotasUsuario.post("/usuario/login", logarUsuario)

export default rotasUsuario