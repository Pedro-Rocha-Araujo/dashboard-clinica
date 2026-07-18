'use client'

import "./cadastrar-profissional.css"
import { useState, useRef, useEffect } from "react"
import { useParams} from "next/navigation"
import axios from "axios"
import { toast } from "react-toastify"
import { Profissional } from "@/interfaces"

export default function CadastrarProfissional() {
  const params = useParams()
  const { id } = params

  const [profissional, setProfissional] = useState<Profissional>()

  const usuarioRef = useRef<HTMLInputElement | null>(null)
  const senhaRef = useRef<HTMLInputElement | null>(null)

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

  async function CadastrarProfissional() {
    
  }

  return (
    <section className="cadastrar-profissional">
      <h2> <i className="fa-solid fa-clipboard"></i> Cadastrar - {profissional?.nome}</h2>
      <form className="cadastrar-profissional">
        <input 
          type="text" 
          required 
          ref={usuarioRef}
          placeholder="Usuario de login do profissional" 
        />
        <input 
          type="password" 
          required 
          ref={senhaRef}
          placeholder="Senha de login do profisisonal" 
        />
        <button>Cadastrar</button>
      </form>
    </section>
  )
}