import type { Request, Response } from "express"
import UsuarioModel from "../models/Usuario.js"
import type { UsuarioBody } from "../interfaces/interfacesUsuario.js"
import type { ProfissionalParams } from "../interfaces/interfacesProfissional.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"
import ProfissionalModel from "../models/Profissional.js"

const salt = 10

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

export async function cadastrarProfissional(
  request:Request<ProfissionalParams,{},UsuarioBody>, response:Response
):Promise<Response> {
  try {
    const { profissional_id } = request.params
    const { usuario, senha } = request.body
    
    if(!usuario || !senha) {
      return response.status(400).json({ Erro: "Todos os campos são obrigatórios." })
    }
    
    const usuarioTratado = usuario.trim()
    const senhaTratada = senha.trim()

    const consulta_profissional = await ProfissionalModel.findById(profissional_id) 
    if(!consulta_profissional) {
      return response.status(404).json({ Erro: "Profissional não encontrado." })
    }
    if(consulta_profissional.cadastrado === true) {
      return response.status(409).json({ Erro: "O profissional emquestão já está cadastrado." })
    }

    const consulta_usuario = await UsuarioModel.findOne({ usuario: usuarioTratado })
    if(consulta_usuario) {
      return response.status(409).json({ Erro: "Nome de usuario já cadastrado." })
    }

    const senhaCriptografada = await bcrypt.hash(senhaTratada, salt)
    await UsuarioModel.create({
      usuario: usuarioTratado,
      senha: senhaCriptografada,
      profissional: profissional_id,
      tipo: "PROFISSIONAL"
    })
    await ProfissionalModel.findByIdAndUpdate(profissional_id, {
      cadastrado: true,
    })
    return response.status(201).json({ Mensagem: "Profissional cadstrado com sucesso." })
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao cadastrar o Profissional",
      erro: erro
    })
  }
}

export async function logarUsuario(
  request:Request<{}, {}, UsuarioBody>, response:Response
):Promise<Response> {
  try {
    const { usuario, senha } = request.body
    if(!usuario || !senha) {
      return response.status(400).json({ Erro: "Todos os campos são obrigatórios." })
    }

    const consulta = await UsuarioModel.findOne({ usuario: usuario.trim() })
    if(!consulta) {
      return response.status(401).json({ Erro: "Usuário e (ou) senha inválido(s)." })
    }
    
    const comparacaoSenha = await bcrypt.compare(senha, consulta.senha)
    if(!comparacaoSenha) {
      return response.status(401).json({ Erro: "Usuário e (ou) senha inválido(s)." })
    }

    const senhaToken = process.env.SENHA_TOKEN
    if(!senhaToken) {
      return response.status(500).json({ Erro: "A senha do JWT não foi passada" })
    }

    const token = jwt.sign(
      { 
        id: consulta._id, 
        usuario: consulta.usuario, 
        tipo: consulta.tipo 
      },
      senhaToken,
      { 
        expiresIn: "1h" 
      }
    )
    return response.status(200).json({token})
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao logar o usuario",
      erro: erro
    })
  }
}