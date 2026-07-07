import ProfissionalModel from "../models/Profissional.js"
import type { Request, Response } from "express"

export async function listarProfissionais(_request:Request, response:Response):Promise<Response> {
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

export async function profissionaisInativos(_request:Request, response:Response):Promise<Response> {
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
    if(!profissional) {
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
    const { nome, especialidade } = request.body
    if(!nome || !especialidade) {
      return response.status(400).json({ Erro: "Todos os campos são obrigatórios." })
    }
    await ProfissionalModel.create({
      nome: nome,
      especialidade: especialidade
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
    await ProfissionalModel.findByIdAndUpdate(profissional_id,{
      ativo:false
    })
    return response.status(200).json({ Mensagem: "Profissional desativado" })
  } catch (erro) {
    return response.status(500).json({ 
      "Mensagem": "Erro ao listar os profissionais inativos",
      "Erro": erro 
    })
  }
}

export async function ativarProfissional(request:Request, response:Response):Promise<Response> {
  try {
    const { profissional_id } = request.params
    if(!profissional_id) {
      return response.status(400).json({ Erro: "Id do profissional não informado." })
    }

    const consulta = await ProfissionalModel.findById(profissional_id)

    if(!consulta) {
      return response.status(404).json({ Erro: "Profissional não encontrado." })
    }

    await ProfissionalModel.findByIdAndUpdate(profissional_id, {
      ativo: true
    })
    
    return response.status(200).json({ Mensagem: "Profissional reativado." })
  } catch(erro) {
    return response.status(500).json({ 
      "Mensagem": "Erro ao listar os profissionais inativos",
      "Erro": erro 
    })
  }
}