import type { Request, Response, NextFunction } from "express"
import Jwt from "jsonwebtoken"
import "dotenv/config"
import type { TokenPayload } from "../interfaces/interfacesToken.js"

export default function checarToken(
  request:Request, response:Response, next:NextFunction
):Response|void {
  try {
    const authorization = request.get("authorization")
    if(!authorization) {
      return response.status(401).json({ Erro: "Token não informado." })
    }
    const [tipo, token] = authorization.split(" ")  
    if(tipo !== "Bearer" || !token) {
      return response.status(401).json({ Erro: "Token não informado." })
    }
    const senhaJwt = process.env.SENHA_TOKEN
    if(!senhaJwt) {
      return response.status(500).json({ Erro: "Senha do JWT não informada." })
    }
    const verificaToken = Jwt.verify(token, senhaJwt) as TokenPayload
    request.usuario = verificaToken
    next()
  } catch(erro) {
    return response.status(401).json({ Erro: "Erro ao checar o token" })
  }
}