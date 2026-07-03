import SenhaModel from "../models/Senha.js"
import type { Request, Response } from "express"

interface NovaSenhaBody {
  paciente_id: string,
  profissional_id: string
}

export async function listarSenhas(_request:Request, response:Response):Promise<Response> {
  try { 
    const listagem = await SenhaModel.find({ status: { $ne: "Aguardando" } })
    return response.status(200).json(listagem)
  } catch(erro) {
    console.log(erro)
    return response.status(500).json({ 
      Mensagem: "Erro ao listar as senhas",
      Erro: erro
    })
  }
}

export async function novaSenha(request:Request<{},{},NovaSenhaBody>, response:Response):Promise<Response> {
  try {
    const { paciente_id, profissional_id } = request.body
    const inicio_dia = new Date()
    const final_dia = new Date()

    inicio_dia.setHours(0, 0, 0, 0)
    final_dia.setHours(23, 59, 59, 999)

    if(!paciente_id || !profissional_id) {
      return response.status(400).json({ Erro: "Campo(s) não informado(s)" })
    }
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
      paciente: paciente_id,
      status: "Aguardando",
      profissional: profissional_id
    })
    
    return response.status(201).json({ Mensagem: "Senha criada com sucesso." })
  } catch(erro) {
    return response.status(500).json({ 
      Mensagem: "Erro ao gerar senha",
      Erro: erro
    })
  }
}