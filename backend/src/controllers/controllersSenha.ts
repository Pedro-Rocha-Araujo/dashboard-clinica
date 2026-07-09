import SenhaModel from "../models/Senha.js"
import PacienteModel from "../models/Pacientes.js"
import type { Request, Response } from "express"

interface NovaSenhaBody {
  paciente_id: string,
  profissional_id: string,
  nome: string
}

interface EncaminhamentoParams {
  senha_id: string
}

interface EncaminhamentoBody {
  nome: string,
  cpf: number,
  telefone: number,
  profissional_id: string,
}

interface EncerramentoParams {
  senha_id: string
}

export async function listarSenhas(_request:Request, response:Response):Promise<Response> {
  try { 
    const listagem = await SenhaModel.find({ status: { $eq: "Aguardando" } }).populate("paciente")
    return response.status(200).json(listagem)
  } catch(erro) {
    return response.status(500).json({ 
      Mensagem: "Erro ao listar as senhas",
      Erro: erro
    })
  }
}

export async function getSenha(request:Request, response:Response):Promise<Response> {
  try {
    const { senha_id } = request.params
    const consulta = await SenhaModel.findById(senha_id).populate("paciente").populate("profissional")
    if(!consulta) {
      return response.status(404).json({ Erro: "Senha não encontrada" })
    }
    return response.status(200).json(consulta)
  } catch(erro) {
    return response.status(500).json({ 
      Mensagem: "Erro ao listar as senha",
      Erro: erro
    })
  }
}

export async function novaSenha(request:Request<{},{},NovaSenhaBody>, response:Response):Promise<Response> {
  try {
    const { nome } = request.body
    const inicio_dia = new Date()
    const final_dia = new Date()

    inicio_dia.setHours(0, 0, 0, 0)
    final_dia.setHours(23, 59, 59, 999)

    if(!nome.trim()) {
      return response.status(400).json({ Erro: "Campo não informado." })
    }

    const paciente = await PacienteModel.create({
      nome: nome.trim()
    })

    const consulta = await SenhaModel.findOne({
      createdAt: {
        $gte: inicio_dia,
        $lte: final_dia
      }
    }).sort({ numero: -1 })

    let maiorNumero:number

    maiorNumero = consulta? consulta.numero + 1: 1
    
    await SenhaModel.create({
      numero: maiorNumero,
      paciente: paciente._id,
      status: "Aguardando"
    })
    
    return response.status(201).json({ Mensagem: "Senha criada com sucesso." })
  } catch(erro) {
    return response.status(500).json({ 
      Mensagem: "Erro ao gerar senha",
      Erro: erro
    })
  }
}

export async function encaminharPaciente(
  request:Request<EncaminhamentoParams,{},EncaminhamentoBody>, response:Response
  ):Promise<Response> {
  try {
    const { senha_id } = request.params
    const { nome, cpf, telefone, profissional_id } = request.body
    if(!senha_id || !profissional_id || !nome || !cpf || !telefone) {
      return response.status(400).json({ Erro: "Campo(s) não informado(s)." })
    }

    const validacao = await SenhaModel.findById(senha_id)
    
    if(validacao) {
      if(validacao.status === "Finalizado") {
        return response.status(409).json({ Erro: "O processo dessa senha já foi finalizado." })
      }
      if(validacao.status === "NaFila") {
        return response.status(409).json({ Erro: "O Paciente já está aguardando." })
      }
    } else {
      return response.status(404).json({ Erro: "Senha não encontrada." })
    }

    await PacienteModel.findByIdAndUpdate(validacao.paciente, {
      nome: nome,
      cpf: cpf, 
      telefone: telefone,
    })

    await SenhaModel.findByIdAndUpdate(senha_id, {
      status: "NaFila",
      profissional: profissional_id
    })

    return response.status(200).json({ Mensagem: `Paciente encaminhado para o profissional.` })
  } catch(erro) {
    return response.status(500).json({ 
      Mensagem: "Erro ao gerar senha",
      Erro: erro
    })
  }
}

export async function encerrarAtendimento(request:Request<EncerramentoParams>, response:Response) {
  try {
    const { senha_id } = request.params
    if(!senha_id) {
      return response.status(400).json({ Erro: "Id da senha não informado." })
    }
    const validacao = await SenhaModel.findById(senha_id)

    if(!validacao) {
      return response.status(400).json({ Erro: "A senha em questão não existe." })
    }
    if(validacao.status !== "NaFila") {
      return response.status(409).json({ Erro: "O status do atendimento não é compatível para ser encerrado no momento." })
    }
    const encerramento = await SenhaModel.findByIdAndUpdate(senha_id, {
      status: "Finalizado"
    })
    if(!encerramento) {
      return response.status(404).json({ Erro: "Erro ao encerrar o atendimento." })
    }
    return response.status(200).json({ Mensagem: "Atendimento finalizado." })
  } catch(erro) {
    return response.status(500).json({ 
      Mensagem: "Erro ao finalizar atendimento.",
      Erro: erro
    })
  }
}

export async function cancelarAtendimento(request:Request, response:Response):Promise<Response> {
  try {
    const { senha_id } = request.params
    if(!senha_id) {
      return response.status(400).json({ Erro: "Id não informado." })
    }
    const consulta = await SenhaModel.findById(senha_id) 
    if(!consulta) {
      return response.status(404).json({ Erro: "Senha não encontrada." })
    }
    await SenhaModel.findByIdAndUpdate(senha_id, {
      status: "Cancelado"
    })
    return response.status(200).json({ Mensagem: "Atendimento cancelado." })
  } catch(erro) {
    return response.status(500).json({ 
      Mensagem: "Erro ao finalizar atendimento.",
      Erro: erro
    })
  }
}