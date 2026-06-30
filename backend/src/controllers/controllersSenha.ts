import SenhaModel from "../models/Senha.js"
import type { Request, Response } from "express"

export async function listarSenhas(request:Request, response:Response):Promise<Response> {
  try { 
    const listagem = await SenhaModel.find({ status: { $ne: "Finalizado" } })
    return response.status(200).json(listagem)
  } catch(erro) {
    console.log(erro)
    return response.status(500).json({Erro: "Erro ao listar as senhas."})
  }
}