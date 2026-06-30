import PacienteModel from "../models/Pacientes.js"
import type { Request, Response } from "express"

export async function listarPacientes(request:Request, response:Response):Promise<Response> {
  try{
    const listagem = await PacienteModel.find()
    return response.status(200).json(listagem)
  } catch(erro) {
    console.log(erro)
    return response.status(500).json({Erro: "Erro ao listar os pacientes."})
  }
}