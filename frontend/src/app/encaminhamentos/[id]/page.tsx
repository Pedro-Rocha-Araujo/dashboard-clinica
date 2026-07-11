'use client'

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-toastify"
import "./senhas-profissional.css"

interface Profissional {
  _id: string,
  nome: string,
  ativo: boolean,
  especialidade: string,
  createdAt: string,
  updatedAt: string
}

interface Paciente {
  _id: string,
  nome: string,
  cpf: number,
  telefone: number,
  createdAt: string,
  updatedAt: string
}

interface Senha {
  _id: string,
  numero: number,
  status: "Aguardando" | "NaFila" | "Finalizado" | "Cancelado"
  profissional: Profissional,
  paciente: Paciente,
  createdAt: string,
  updatedAt: string
}

export default function SenhasProfissional() {
  const params = useParams()
  const { id } = params

  const router = useRouter()

  const [senhas, setSenhas] = useState<Senha[]>([])
  const [profissional, setProfissional] = useState<Profissional>()
  
  useEffect(()=>{
    async function getSenhas() {
      try {
         const response = await axios.get(`http://localhost:4000/senha/profissional/${id}`)
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
        const response = await axios.get(`http://localhost:4000/profissional/${id}`)
        setProfissional(response.data)
      } catch(erro) {
        console.log(erro)
      }
    }
    getProfisisonal()
  } , [id])

  async function finalizarAtendimento(id: string) {
    try {
      await axios.patch(`http://localhost:4000/senha/${id}`)
      toast.success("Atendimento finalizado.")
      router.replace("/encaminhamentos/"+id)
    } catch(erro){
      console.log(erro)
      toast.error("Erro ao finalizar o atendimento.")
    }
  }

  async function cancelarAtendimento(id: string) {
    try {
      await axios.patch(`http://localhost:4000/senha/${id}/cancelar`)
      toast.success("Atendimento cancelado.")
      router.replace("/encaminhamentos/"+id)
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
                  <td>{senha.numero}</td>
                  <td>{senha.paciente.nome}</td>
                  <td>{senha.status}</td>
                  <td>
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