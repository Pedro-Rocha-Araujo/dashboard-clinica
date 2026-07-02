import PacienteModel from "../models/Pacientes.js"
import type { Request, Response } from "express"

interface Paciente {
  nome:string,
  cpf:number,
  telefone:number
}

export async function listarPacientes(_request:Request, response:Response):Promise<Response> {
  try{
    const listagem = await PacienteModel.find()
    return response.status(200).json(listagem)
  } catch(erro) {
    console.log(erro)
    return response.status(500).json({
      Mensagem: "Erro ao listar os pacientes",
      Erro: erro
    })
  }
}

export async function getPaciente(request:Request, response:Response):Promise<Response> {
  try {
    const { paciente_id } = request.params
    if(!paciente_id) {
      return response.status(400).json({ Erro: "O id do paciente não foi informado" })
    }
    const paciente = await PacienteModel.findById(paciente_id)
    if(!paciente) {
      return response.status(404).json({ Erro: "Psciente não encontrado." })
    }
    return response.status(200).json(paciente)
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao listar o paciente",
      Erro: erro
    })
  }
}

export async function novoPaciente(request:Request, response:Response):Promise<Response> {
  try {
    const { nome, cpf, telefone } = request.body
    if(!nome || !cpf || !telefone) {
      return response.status(400).json({ Erro: "Preencha todos os campos." })
    }
    await PacienteModel.create({
      nome: nome.trim(),
      cpf: cpf,
      telefone: telefone
    })
    return response.status(201).json(`Paciente cadastrado com sucesso.`)
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao cadastrar paciente",
      Erro: erro
    })
  }
}

export async function deletarPaciente(request:Request, response:Response):Promise<Response> {
  try {
    const { paciente_id } = request.params
    if(!paciente_id) {
      return response.status(400).json({ Erro: "O id do Paciente não foi informado!" })
    }
    const paciente = await PacienteModel.findByIdAndDelete(paciente_id)
    if(!paciente) {
      return response.status(404).json({ Erro: "Paciente não encontrado." })
    }
    return response.status(200).json({ Mensagem: "Paciente deletado com sucesso." })
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao cadastrar paciente",
      Erro: erro
    })
  }
}