'use client'

import { Profissional } from "@/interfaces"
import ProfissionaisAtivos from "./(profissionais)/Ativos"
import ProfissionaisInativos from "./(profissionais)/Inativos"
import axios from "axios"
import { useState, useEffect } from "react"
import "./gerenciar-profissionais.css"
import Cookies from "js-cookie"

export default function GerenciarProfissionais() {
  const [profissionaisAtivos, setProfissionaisAtivos] = useState<Profissional[]>([])
  const [profissionaisInativos, setProfissionaisInativos] = useState<Profissional[]>([])

  const token = Cookies.get("token")

  async function getProfissionaisInativos() {
    try {
      const response = await axios.get("http://localhost:4000/profissional/inativos", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setProfissionaisInativos(response.data)
    } catch(erro) {
      console.log(erro)
    }
  }
  async function getProfissionaisAtivos() {
    try {
      const response = await axios.get("http://localhost:4000/profissional/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setProfissionaisAtivos(response.data)
    } catch(erro) {
      console.log(erro)
    }
  }

  useEffect(()=>{
    getProfissionaisInativos()
    getProfissionaisAtivos()
  }, [profissionaisAtivos, profissionaisInativos])
  
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