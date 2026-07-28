'use client'
import { Senha, Profissional } from "@/interfaces"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { toast } from "react-toastify"
import "./senhas-profissional.css"
import Cookies from "js-cookie"

export default function SenhasProfissional() {
  const params = useParams()
  const { id } = params

  const token = Cookies.get("token")

  const [senhas, setSenhas] = useState<Senha[]>([])
  const [profissional, setProfissional] = useState<Profissional>()
  
  useEffect(()=>{
    async function getSenhas() {
      try {
         const response = await axios.get(`http://localhost:4000/senha/profissional/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
         })
         setSenhas(response.data)
      } catch(erro) {
        console.log(erro)
      }
    }
    getSenhas()
  },[])

  useEffect(()=>{
    async function getProfisisonal() {
      try {
        const response = await axios.get(`http://localhost:4000/profissional/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProfissional(response.data)
      } catch(erro) {
        console.log(erro)
      }
    }
    getProfisisonal()
  } , [id])

  async function finalizarAtendimento(id: string) {
    try {
      await axios.patch(
        `http://localhost:4000/senha/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setSenhas(senhas.filter((senha)=>{
        return senha._id !== id
      }))
      toast.success("Atendimento finalizado.")
    } catch(erro){
      console.log(erro)
      toast.error("Erro ao finalizar o atendimento.")
    }
  }

  async function cancelarAtendimento(id: string) {
    try {
      await axios.patch(
        `http://localhost:4000/senha/${id}/cancelar`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setSenhas(senhas.filter((senha)=>{
        return senha._id !== id
      }))
      toast.success("Atendimento cancelado.")
    } catch(erro){
      console.log(erro)
      toast.error("Erro ao cancelar o atendimento.")
    }
  }

  return (
    <section className="senhas-profissional">
      <h2> <i className="fa-solid fa-list-ol"></i> {profissional?.nome} | Senhas</h2>

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
    </section>
  )
}