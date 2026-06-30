import { Router } from "express"
import { listarSenhas } from "../controllers/controllersSenha.js"

const rotasSenha = Router()

rotasSenha.get("/senha", listarSenhas)

export default rotasSenha