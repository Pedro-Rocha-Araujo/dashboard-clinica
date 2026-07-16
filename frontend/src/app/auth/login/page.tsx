'use client'

import "../usuario.css"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { toast } from "react-toastify"

export default function Login() {
  const router = useRouter()

  const usuarioRef = useRef<HTMLInputElement | null>(null)
  const senhaRef = useRef<HTMLInputElement | null>(null)

  async function logarUsuario(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const usuario = usuarioRef.current?.value.trim()
      const senha = senhaRef.current?.value.trim()
      if(!usuario || !senha) {
        return toast.error("Preencha todos os campos.")
      }
      const response = await axios.post("http://localhost:4000/usuario/login", {
        usuario: usuario,
        senha: senha
      })

      const token = response.data.token
      localStorage.setItem("token", token)
      router.replace("/")
    } catch(erro) {
      if(axios.isAxiosError(erro)) {
        return toast.error(erro.response?.data.Erro)
      } else {
        console.log(erro)
        toast.error("Erro ao logar o usuario.")
      }
    }
  }

  return (
    <section className="usuario">
      <div className="container">
        
        <div className="header">
          <h1>Login</h1>
        </div>

        <form className="main" onSubmit={logarUsuario} >
          <input 
            type="text" 
            placeholder="Digite um nome de Usuario" 
            ref={usuarioRef}
            required 
          />
          <input 
            type="password" 
            placeholder="Disite sua senha de acesso" 
            ref={senhaRef}
            required 
          />
          <button>Fazer Login</button>
        </form>

        <div className="footer">
          <p>Não possui um cadastro? <Link href={`/auth/cadastro`}>Criar Conta.</Link></p>
        </div>
        
      </div>
    </section>
  )
}