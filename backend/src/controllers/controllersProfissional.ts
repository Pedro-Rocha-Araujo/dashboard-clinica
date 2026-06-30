import ProfissionalModel from "../models/Profissional.js"
import type { Request, Response } from "express"

export async function listarProfissionais(request: Request, response: Response):Promise<Response> {
  try{
    const listagem = await ProfissionalModel.find({ativo: true})
    return response.status(200).json(listagem)
  } catch(erro) {
    console.log(erro)
    return response.status(500).json({Erro: "Erro ao listar os profissionais disponíveis"})
  }
}