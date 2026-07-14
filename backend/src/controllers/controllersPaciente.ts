import PacienteModel from "../models/Pacientes.js"
import type { Request, Response } from "express"
import type { PacienteParams } from "../interfaces/interfacesPaciente.js"

export async function listarPacientes(_request:Request, response:Response):Promise<Response> {
  try{
    const listagem = await PacienteModel.find().sort({ nome: 1 })
    return response.status(200).json(listagem)
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao listar os pacientes",
      Erro: erro
    })
  }
}

export async function getPaciente(request:Request<PacienteParams>, response:Response):Promise<Response> {
  try {
    const { paciente_id } = request.params
    const paciente = await PacienteModel.findById(paciente_id)
    if(!paciente) {
      return response.status(404).json({ Erro: "Paciente não encontrado." })
    }
    return response.status(200).json(paciente)
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao listar o paciente",
      Erro: erro
    })
  }
}

export async function deletarPaciente(request:Request<PacienteParams>, response:Response):Promise<Response> {
  try {
    const { paciente_id } = request.params
    const paciente = await PacienteModel.findByIdAndDelete(paciente_id)
    if(!paciente) {
      return response.status(404).json({ Erro: "Paciente não encontrado." })
    }
    return response.status(200).json({ Mensagem: "Paciente deletado com sucesso." })
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao deletar paciente",
      Erro: erro
    })
  }
}