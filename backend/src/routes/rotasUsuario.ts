import { Router } from "express"
import {
  cadastrarRecepcionista,
} from "../controllers/controllersUsuario.js"

const rotasUsuario = Router()

rotasUsuario.post("/usuario", cadastrarRecepcionista)

export default rotasUsuario