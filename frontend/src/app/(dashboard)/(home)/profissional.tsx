'use client'
import { Senha, Token } from "@/interfaces"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-toastify"
import "./home-profissional.css"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

export default function HomeProfissional() {
  const cookie = Cookies.get("token")
  if(!cookie) {
    return null
  }
  const token:Token = jwtDecode(cookie)

  const router = useRouter()

  const [senhas, setSenhas] = useState<Senha[]>([])
  const [profissional, setProfissional] = useState<string>("")

  useEffect(()=> {
    async function getProfissional() {
      try {
        const response = await axios.get(`http://localhost:4000/usuario/${token.id}`)
        setProfissional(response.data.profissional)
      } catch(erro) {
        console.log(erro)
      }
    }
    getProfissional()
  }, [])
  
  useEffect(()=>{
    async function getSenhas() {
      try {
         const response = await axios.get(`http://localhost:4000/senha/profissional/${profissional}`)
         setSenhas(response.data)
      } catch(erro) {
        console.log(erro)
      }
    }
    getSenhas()
  }, [profissional, senhas])

  async function finalizarAtendimento(id: string) {
    try {
      await axios.patch(`http://localhost:4000/senha/${id}`)
      toast.success("Atendimento finalizado.")
      senhas.filter((senha)=>{
        return id !== senha._id
      })
    } catch(erro){
      console.log(erro)
      toast.error("Erro ao finalizar o atendimento.")
    }
  }

  function sairConta() {
    Cookies.remove("token")
    router.replace("/auth/login")
  }

  async function cancelarAtendimento(id: string) {
    try {
      await axios.patch(`http://localhost:4000/senha/${id}/cancelar`)
      toast.success("Atendimento cancelado.")
      senhas.filter((senha)=>{
        return id !== senha._id
      })
    } catch(erro){
      console.log(erro)
      toast.error("Erro ao cancelar o atendimento.")
    }
  }

  return (
    <section className="senhas-profissional">
      <h2> <i className="fa-solid fa-list-ol"></i> {token.usuario} | Senhas</h2>

      <table>
        <thead>
          <tr>
            <th>Senha</th>
            <th>Paciente</th>
            <th>Status</th>
            <th>Funcionalidades</th>
          </tr>
          
        </thead>

        <tbody>
          { senhas.length > 0 ? (
            senhas.map((senha)=>{
              return (
                <tr key={senha._id}>
                  <td data-label="Senha">{senha.numero}</td>
                  <td data-label="Paciente">{senha.paciente.nome}</td>
                  <td data-label="Status">{senha.status}</td>
                  <td data-label="Funcionalidades">
                    <div className="botoes">
                      <button onClick={()=>finalizarAtendimento(senha._id)} className="blue">
                        Finalizar
                      </button>
                      <button onClick={()=>cancelarAtendimento(senha._id)} className="red">
                        Cancelar
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })
          ): (
            <tr>
              <td colSpan={100}>
                <p>Nenhum paciente até o momento</p>
              </td>
            </tr>
          ) }
        </tbody>

      </table>
      <br />
      <button className="red" onClick={()=>sairConta()}>Sair</button>
    </section>
  )
}