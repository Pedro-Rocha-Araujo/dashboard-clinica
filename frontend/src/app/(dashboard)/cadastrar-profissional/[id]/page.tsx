'use client'

import "./cadastrar-profissional.css"
import { useState, useRef, useEffect } from "react"
import { useParams} from "next/navigation"
import axios from "axios"
import { Profissional } from "@/interfaces"

export default function CadastrarProfissional() {
  const params = useParams()
  const { id } = params

  const [profissional, setProfissional] = useState<Profissional>()

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

  return (
    <section className="cadastrar-profissional">
      <h2> <i className="fa-solid fa-clipboard"></i> Cadastrar - {profissional?.nome}</h2>
      <form className="cadastrar-profissional">
        <input 
          type="text" 
          required 
          placeholder="Usuario de login do profissional" 
        />
        <input 
          type="password" 
          required 
          placeholder="Senha de login do profisisonal" 
        />
        <button>Cadastrar</button>
      </form>
    </section>
  )
}