import ProfissionalModel from "../models/Profissional.js"
import type { Request, Response } from "express"
import type { 
  ProfissionalParams, 
  ProfissionalBody 
} from "../interfaces/interfacesProfissional.js"

export async function listarProfissionais(_request:Request, response:Response):Promise<Response> {
  try{
    const listagem = await ProfissionalModel.find({ ativo: true }).sort({ nome: 1 })
    return response.status(200).json(listagem)
  } catch(erro) {
    return response.status(500).json({ 
      "Mensagem": "Erro ao listar os profissionais em atividade",
      "Erro": erro 
    })
  }
}
export async function profissionaisInativos(_request:Request, response:Response):Promise<Response> {
  try {
    const listagem = await ProfissionalModel.find({ ativo: false }).sort({ nome: 1 })
    return response.status(200).json(listagem)
  } catch (erro) {
    return response.status(500).json({ 
      "Mensagem": "Erro ao listar os profissionais inativos",
      "Erro": erro 
    })
  }
}
export async function getProfissional(
  request:Request<ProfissionalParams>, response:Response
):Promise<Response> {
  try {
    const { profissional_id } = request.params
    const profissional = await ProfissionalModel.findById(profissional_id)
    if(!profissional) {
      return response.status(404).json({ Erro: "Profissional não encotrado!" })
    }
    return response.status(200).json(profissional)
  } catch(erro) {
    return response.status(500).json({ 
      "Mensagem": "Erro ao listar profissional",
      "Erro": erro 
    })
  }
}


export async function novoProfissional(
  request:Request<{},{},ProfissionalBody>, response:Response
):Promise<Response> {
  try {
    const { nome, especialidade } = request.body
    if(!nome || !especialidade) {
      return response.status(400).json({ Erro: "Todos os campos são obrigatórios." })
    }
    const existe = await ProfissionalModel.findOne({ nome, especialidade })
    if(existe) {
      return response.status(409).json({ Erro: "O profisisonal em questão já foi cadstrado" })
    }
    await ProfissionalModel.create({
      nome: nome,
      especialidade: especialidade
    })
    return response.status(201).json({ Mensagem: `Profissional ${nome} cadastrado com sucesso.` })
  } catch(erro) {
    return response.status(500).json({ 
      "Mensagem": "Erro ao cadastrar profissional",
      "Erro": erro 
    })
  }
}


export async function editarProfissional(
  request:Request<ProfissionalParams,{},ProfissionalBody>, response:Response
):Promise<Response> {
  try {
    const { profissional_id } = request.params
    const { nome, especialidade } = request.body
    if(!nome || !especialidade) {
      return response.status(400).json({ Erro: "Todos os campos são obrigatórios." })
    }
    const profissional = await ProfissionalModel.findByIdAndUpdate(profissional_id, {
      nome: nome,
      especialidade: especialidade
    })
    if(!profissional) {
      return response.status(404).json({ Erro: "Profissional não encontrado." })
    }
    return response.status(200).json({ Mensagem: "Profissional editado com sucesso." })
  } catch(erro) {
    return response.status(500).json({ 
      "Mensagem": "Erro ao editar o profissional.",
      "Erro": erro 
    })
  }
}


export async function desativarProfissional(
  request:Request<ProfissionalParams>, response:Response
):Promise<Response> {
  try {
    const { profissional_id } = request.params
    const profissional = await ProfissionalModel.findByIdAndUpdate(profissional_id,{
      ativo:false
    })
    if(!profissional) {
      return response.status(404).json({ Erro: "Profisisonal não encontrado." })
    }
    return response.status(200).json({ Mensagem: "Profissional desativado" })
  } catch (erro) {
    return response.status(500).json({ 
      "Mensagem": "Erro ao desativar o profissional.",
      "Erro": erro 
    })
  }
}

export async function ativarProfissional(
  request:Request<ProfissionalParams>, response:Response
):Promise<Response> {
  try {
    const { profissional_id } = request.params
    const profissional = await ProfissionalModel.findByIdAndUpdate(profissional_id, {
      ativo: true
    })
    if(!profissional) {
      return response.status(404).json({ Erro: "Profisisonal não encontrado." })
    }
    
    return response.status(200).json({ Mensagem: "Profissional reativado." })
  } catch(erro) {
    return response.status(500).json({ 
      "Mensagem": "Erro ao reativar o profissional",
      "Erro": erro 
    })
  }
}