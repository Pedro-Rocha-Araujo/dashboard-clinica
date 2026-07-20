'use client'
import { useRef } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-toastify"
import "./gerar-senha.css"
import Cookies from "js-cookie"

export default function GerarSenha() {
  const router = useRouter()
  const nomeRef = useRef<HTMLInputElement>(null)

  const token = Cookies.get("token")

  async function gerarSenha(e: React.FormEvent) {
    e.preventDefault() 
    try {
      const nome = nomeRef.current?.value
      if(!nome){
        return toast.error("Preencha o nome do paciente.")
      }
      await axios.post("http://localhost:4000/senha", 
        {
          nome: nome
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      toast.success("Senha gerada com sucesso.")
      router.replace("/")
    } catch(erro) {
      console.log(erro)
      return toast.error("Erro ao gerar senha.")
    }
  }
  return (
    <section className="gerar-senha">
      <h2> <i className="fa-solid fa-list-ol"></i> Gerar Senha</h2>
      <form onSubmit={gerarSenha}>
        <input 
          type="text" 
          required 
          placeholder="Digite o nome do Paciente"
          ref={nomeRef}
        />
        <button>Gerar senha</button>
      </form>
    </section>
  )
}