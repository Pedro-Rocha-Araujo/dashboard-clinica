'use client'

import "../usuario.css"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"

interface ErroResponse {
  Erro: string
}

export default function Cadastro() {
  const router = useRouter()

  const usuarioRef = useRef<HTMLInputElement | null>(null)
  const senhaRef = useRef<HTMLInputElement | null>(null)

  async function cadastrarRecepcionista(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const usuario = usuarioRef.current?.value.trim()
      const senha = senhaRef.current?.value.trim()

      if(!usuario || !senha) {
        toast.error("Preencha todos os campos.")
      }
      await axios.post("http://localhost:4000/usuario", {
        usuario: usuario,
        senha: senha
      })
      toast.success("Recepcionista cadastrado.")
      router.replace("/auth/login")
    } catch(erro) {
      console.log(erro)
      const error = erro as AxiosError<ErroResponse>
      if(error.response) {
        return toast.error(error.response.data.Erro)
      }
      toast.error("Erro no cadastro.")
    }
  }

  return (
    <section className="usuario">
      <div className="container">
        
        <div className="header">
          <h1>Cadastro</h1>
        </div>

        <form className="main" onSubmit={cadastrarRecepcionista}>
          <input 
            type="text" 
            placeholder="Digite um nome de Usuario" 
            ref={usuarioRef}
            required
          />
          <input 
            type="password" 
            placeholder="Digite sua senha de acesso" 
            ref={senhaRef}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>

        <div className="footer">
          <p>Já possui cadastro? <Link href={`/auth/login`}>Logar-se.</Link></p>
        </div>
        
      </div>
    </section>
  )
}