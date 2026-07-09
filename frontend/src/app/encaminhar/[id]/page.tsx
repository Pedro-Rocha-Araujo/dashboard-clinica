'use client'

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import "./encaminhamento.css"

interface Profissional {
  _id: string,
  nome: string,
  ativo: boolean,
  especialidade: string
}

export default function Encaminhamento() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([])
  const [profSelecionado, setProfSelecionado] = useState<string>()

  async function getProfissionais() {
    try {
      const response = await axios.get("http://localhost:4000/profissional")
      setProfissionais(response.data)
    } catch(erro) {
      console.log(erro)
    }
  }

  useEffect(()=>{
    getProfissionais()
  }, [])

  
  return (
    <section className="encaminhamento">
      <h2> <i className="fa-solid fa-circle-chevron-right"></i> Encaminhar Paciente</h2>
      <form>
        <input type="text" required placeholder="Nome do Paciente" />
        <input type="number" required placeholder="CPF do Paciente" />
        <input type="number" required placeholder="Telefone do Paciente" />
        <div className="profissionais">
          <h3>Escolher Profissional</h3>
          <select onChange={(e)=>setProfSelecionado(e.target.value)} defaultValue={profSelecionado}>
            <option disabled selected>Selecionar Profissional...</option>
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