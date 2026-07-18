'use client'

import "./cadastrar-profissional.css"
import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-toastify"
import { Profissional } from "@/interfaces"

export default function CadastrarProfissional() {
  const router = useRouter()
  const params = useParams()
  const { id } = params

  const [profissional, setProfissional] = useState<Profissional>()

  const usuarioRef = useRef<HTMLInputElement | null>(null)
  const senhaRef = useRef<HTMLInputElement | null>(null)

  useEffect(()=>{
    async function getProfissional() {
      try {
        const response = await axios.get(`http://localhost:4000/profissional/${id}`)
        setProfissional(response.data)
      } catch(erro) {
        console.log(erro)
      }
    }
    getProfissional()
  }, [id])

  async function cadastrarProfissional(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const usuario = usuarioRef.current?.value.trim()
      const senha = senhaRef.current?.value.trim()
      if(!usuario || !senha) {
        return toast.error("Preencha todos os campos")
      }
      await axios.post(`http://localhost:4000/usuario/${id}`, {
        usuario: usuario,
        senha: senha
      })
      toast.success("Profissional cadastrado")
      router.replace("/gerenciar-profissionais")
    } catch(erro) {
      if(axios.isAxiosError(erro)) {
        return toast.error(erro.response?.data.Erro)
      }else {
        console.log(erro)
        toast.error("Erro ao cadastrar profissional.")
      }
    }
  }

  return (
    <section className="cadastrar-profissional">
      <h2> <i className="fa-solid fa-clipboard"></i> Cadastrar - {profissional?.nome}</h2>
      <form className="cadastrar-profissional" onSubmit={cadastrarProfissional}>
        <input 
          type="text" 
          required 
          ref={usuarioRef}
          placeholder="Usuario de login do profissional" 
        />
        <input 
          type="password" 
          required 
          ref={senhaRef}
          placeholder="Senha de login do profisisonal" 
        />
        <button>Cadastrar</button>
      </form>
    </section>
  )
}