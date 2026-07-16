import type { Request, Response } from "express"
import UsuarioModel from "../models/Usuario.js"
import bcrypt from "bcrypt"

const salt = 10

interface UsuarioBody {
  usuario: string,
  senha: string
}

export async function cadastrarRecepcionista(
  request:Request<{}, {}, UsuarioBody>, response:Response
):Promise<Response> {
  try {
    const { usuario, senha } = request.body

    if(!usuario || !senha) {
      return response.status(400).json({ Erro: "Todos os dados são obrigatórios." })
    }
    const validacao = await UsuarioModel.findOne({ usuario: usuario.trim() })
    if(validacao) {
      return response.status(409).json({ Erro: "Nome de usuário já cadastrado." })
    }
    const senhaCriptografada = await bcrypt.hash(senha, salt)
    await UsuarioModel.create({
      usuario: usuario.trim(),
      senha: senhaCriptografada,
      tipo: "RECEPCAO"
    })
    return response.status(201).json({ Mensagem: `Usuario ${usuario.trim()} cadastrado com sucesso.` })
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao cadastrar o Recepcionista",
      erro: erro
    })
  }
}