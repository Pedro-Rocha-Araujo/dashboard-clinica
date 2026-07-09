'use client'

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-toastify"
import "./encaminhamento.css"

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

export default function Encaminhamento() {
  const params = useParams()
  const { id } = params

  const router = useRouter()

  const [profissionais, setProfissionais] = useState<Profissional[]>([])
  const [profSelecionado, setProfSelecionado] = useState<string>("")
  const [agendamento, setAgendamento] = useState<Senha | null>(null)

  const nomeRef = useRef<HTMLInputElement>(null)
  const cpfRef = useRef<HTMLInputElement>(null)
  const telefoneRef = useRef<HTMLInputElement>(null)

  async function getProfissionais() {
    try {
      const response = await axios.get<Profissional[]>("http://localhost:4000/profissional")
      setProfissionais(response.data)
    } catch(erro) {
      console.log(erro)
    }
  }

  useEffect(()=>{
    getProfissionais()
  }, [])

  useEffect(()=>{
    async function getAgendamento() {
      try {
        const response = await axios.get<Senha>(`http://localhost:4000/senha/${id}`)
        setAgendamento(response.data)
      } catch(erro) {
        console.log(erro)
      }
    }
    getAgendamento()
  }, [id])

  async function encaminharPaciente(e:React.FormEvent) {
    e.preventDefault()
    try {
      const nome = nomeRef.current?.value
      const cpf = cpfRef.current?.value
      const telefone = telefoneRef.current?.value
      if(!nome || !cpf || !telefone || !profSelecionado) {
        return toast.error("Preencha todos os campos.")
      }
      await axios.patch(`http://localhost:4000/senha/${id}/encaminhamento`, {
        nome: nome.trim(),
        cpf: cpf,
        telefone: telefone,
        profissional_id: profSelecionado
      })
      toast.success("Paciente encaminhado.")
      router.replace("/")
    } catch(erro) {
      console.log(erro)
      toast.error("Erro ao encaminhar paciente.")
    }
  }

  
  return (
    <section className="encaminhamento">
      <h2> <i className="fa-solid fa-circle-chevron-right"></i> Encaminhar Paciente</h2>
      <form onSubmit={encaminharPaciente}>
        <input 
          type="text" 
          required 
          ref={nomeRef}
          placeholder="Nome do Paciente"
          defaultValue={agendamento?.paciente.nome}
        />
        <input 
          type="number" 
          required 
          ref={cpfRef}
          placeholder="CPF do Paciente" 
        />
        <input 
          type="number" 
          required 
          ref={telefoneRef}
          placeholder="Telefone do Paciente" 
        />
        <div className="profissionais">
          <h3>Escolher Profissional</h3>
          <select onChange={(e)=>setProfSelecionado(e.target.value)} value={profSelecionado}>
            <option value="" disabled >Selecionar Profissional...</option>
            {profissionais.map((profissional)=>{
              return (
                <option 
                  key={profissional._id} 
                  value={profissional._id}>
                  {profissional.nome} - {profissional.especialidade}
                </option>
              )
            })}
          </select>
        </div>
        <button>Encaminhar Paciente</button>
      </form>
    </section>
  )
}