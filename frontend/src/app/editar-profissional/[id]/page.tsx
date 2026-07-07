'use client'
import { useState, useRef, useEffect } from "react"
import { useParams } from "next/navigation"
import { toast } from "react-toastify"
import axios from "axios"
import "./editar-profissional.css"

interface Profissional {
  _id: string,
  nome: string,
  ativo: boolean,
  especialidade: string
}

export default function EditarProfissional() {
  const params = useParams()
  const id = params.id as String
  console.log(id)

  const [profissional, setProfissional] = useState<Profissional | null>(null)
  
  const nomeRef = useRef(null)
  const especialidadeRef = useRef(null)

  async function getProfissional() {
    try {
      const response = await axios.get<Profissional>(`http://localhost:4000/profissional/${id}`)
      setProfissional(response.data)
    } catch(erro) {
      console.log(erro)
      toast.error("Erro ao buscar o profissional.")
    }
  }

  useEffect(()=> {
    getProfissional()
  }, [id])

  return (
    <section className="editar-profissional">
      <h2> <i className="fa-solid fa-pen-to-square"></i> Editar Profissional</h2>
      
      <form className="editar-profissional" >
        <input 
          placeholder="Nome do Profissional"
          defaultValue={profissional?.nome}
          ref={nomeRef}
          required 
        />

        <input 
          placeholder="Especialidade do Profissional"
          defaultValue={profissional?.especialidade}
          ref={especialidadeRef}
          required 
        />
        <button>Editar</button>
      </form>
    </section>
  )
}