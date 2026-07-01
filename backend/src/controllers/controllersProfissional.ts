import ProfissionalModel from "../models/Profissional.js"
import type { Request, Response } from "express"

export async function listarProfissionais(request:Request, response:Response):Promise<Response> {
  try{
    const listagem = await ProfissionalModel.find({ativo: true})
    return response.status(200).json(listagem)
  } catch(erro) {
    console.log(erro)
    return response.status(500).json({ 
      "Mensagem": "Erro ao listar os profissionais",
      "Erro": erro 
    })
  }
}

export async function profissionaisInativos(request:Request, response:Response):Promise<Response> {
  try {
    const listagem = await ProfissionalModel.find({ ativo: false })
    return response.status(200).json(listagem)
  } catch (erro) {
    return response.status(500).json({ 
      "Mensagem": "Erro ao listar os profissionais inativos",
      "Erro": erro 
    })
  }
}

export async function getProfissional(request:Request, response:Response):Promise<Response> {
  try {
    const { profissional_id } = request.params
    if(!profissional_id) {
      return response.status(400).json({ Erro: "Informe o ID do Profissional em questão." })
    } 
    const profissional = await ProfissionalModel.findById(profissional_id)
    if(!profissional_id) {
      return response.status(404).json({ Erro: "Profissional não encotrado!" })
    }
    return response.status(200).json(profissional)
  } catch(erro) {
    return response.status(500).json({ 
      "Mensagem": "Erro ao listar os profissionais inativos",
      "Erro": erro 
    })
  }
}

export async function novoProfissional(request:Request, response:Response):Promise<Response> {
  try {
    const { nome, especialidade_id } = request.body
    if(!nome || especialidade_id) {
      return response.status(400).json({ Erro: "Todos os campos são obrigatórios." })
    }
    const cadastro = await ProfissionalModel.create({
      nome: nome,
      especialidade: especialidade_id
    })
    return response.status(201).json({ Mensagem: `Profissional ${nome} cadastrado com sucesso.` })
  } catch(erro) {
    return response.status(500).json({ 
      "Mensagem": "Erro ao listar os profissionais inativos",
      "Erro": erro 
    })
  }
}

export async function desativarProfissional(request:Request, response:Response):Promise<Response> {
  try {
    const { profissional_id } = request.params
    if(!profissional_id) {
      return response.status(400).json({ Erro: "Id do profissional não informado" })
    }
    await ProfissionalModel.findByIdAndUpdate({profissional_id},{status:false})
    return response.status(200).json({ Mensagem: "Profissional desativado" })
  } catch (erro) {
    return response.status(500).json({ 
      "Mensagem": "Erro ao listar os profissionais inativos",
      "Erro": erro 
    })
  }
}