'use client'

import ProfissionaisAtivos from "./(profissionais)/Ativos"
import ProfissionaisInativos from "./(profissionais)/Inativos"
import axios from "axios"
import { toast } from "react-toastify"
import { useState, useEffect } from "react"
import "./gerenciar-profissionais.css"

export interface Profissional {
  _id: string,
  nome: string,
  especialidade: string,
  ativo: boolean
}

export default function GerenciarProfissionais() {
  const [profissionaisAtivos, setProfissionaisAtivos] = useState<Profissional[]>([])
  const [profissionaisInativos, setProfissionaisInativos] = useState<Profissional[]>([])

  async function getProfissionaisInativos() {
    try {
      const response = await axios.get("http://localhost:4000/profissional/inativos")
      setProfissionaisInativos(response.data)
    } catch(erro) {
      console.log(erro)
      toast.error("Erro ao buscar profissionais inativos.")
    }
  }

  async function getProfissionaisAtivos() {
    try {
      const response = await axios.get("http://localhost:4000/profissional/")
      setProfissionaisAtivos(response.data)
    } catch(erro) {
      console.log(erro)
      toast.error("Erro ao buscar profissionais.")
    }
  }

  useEffect(()=>{
    getProfissionaisInativos()
    getProfissionaisAtivos()
  })
  
  return (
    <section className="gerenciar-profissionais">
      <h2> <i className="fa-solid fa-users"></i> Gerenciar Profissionais</h2>
      
      <h3>Profissionais Ativos</h3>
      <ProfissionaisAtivos profissionaisAtivos={profissionaisAtivos} />

      <h3>Profissionais Inativos</h3>
      <ProfissionaisInativos profissionaisInativos={profissionaisInativos} />
    </section>
  )
}