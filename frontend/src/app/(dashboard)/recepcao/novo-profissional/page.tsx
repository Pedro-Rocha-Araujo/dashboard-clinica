'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useRef } from "react"
import "./novo-profissional.css"
import Cookies from "js-cookie"

export default function NovoProfissional() {

  const router = useRouter()

  const token = Cookies.get("token")

  const nomeRef = useRef<HTMLInputElement>(null)
  const especialidadeRef = useRef<HTMLInputElement>(null)


  async function cadastrarProfissional(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      if(!nomeRef.current?.value || !especialidadeRef.current?.value) {
        return toast.error("Todos os campos são obrigatórios.")
      }
      await axios.post("http://localhost:4000/profissional/",
        {
          nome: nomeRef.current?.value,
          especialidade: especialidadeRef.current?.value
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          } 
        }
    )
      router.push("/gerenciar-profissionais")
    } catch(erro) {
      console.log(erro)
      return toast.error("Erro ao cadastrar o Profissional.")
    }
  }

  return (
    <section className="novo-profissional">
      <h2> <i className="fa-solid fa-circle-plus"></i> Novo Profissional</h2>
      
      <form className="novo-profissional" onSubmit={cadastrarProfissional} >
        <input 
          placeholder="Nome do Profissional"
          ref={nomeRef}
          required 
        />

        <input 
          placeholder="Especialidade do Profissional"
          ref={especialidadeRef}
          required 
        />
        <button type="submit">Cadastrar</button>
      </form>
    </section>
  )
}