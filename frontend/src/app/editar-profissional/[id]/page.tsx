'use client'
import { Profissional } from "@/interfaces"
import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-toastify"
import axios from "axios"
import "./editar-profissional.css"

export default function EditarProfissional() {
  const params = useParams()
  const router = useRouter()

  const id = params.id as String

  const [profissional, setProfissional] = useState<Profissional | null>(null)
  
  const nomeRef = useRef<HTMLInputElement>(null)
  const especialidadeRef = useRef<HTMLInputElement>(null)

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


  async function editarProfissional(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      if(!nomeRef.current || !especialidadeRef.current) {
        return
      }
      if(!nomeRef.current.value.trim() || !especialidadeRef.current.value.trim()) {
        return toast.error("Preencha todos os campos.")
      }
      await axios.put(`http://localhost:4000/profissional/${id}`, {
        nome: nomeRef.current.value,
        especialidade: especialidadeRef.current.value
      })
      toast.success("Profissional Editado.")
      router.replace("/gerenciar-profissionais")
    } catch(erro) {
      console.log(erro)
      toast.error("Erro ao editar o Profissional.")
    }
  }

  return (
    <section className="editar-profissional">
      <h2> <i className="fa-solid fa-pen-to-square"></i> Editar Profissional</h2>
      
      <form onSubmit={editarProfissional} className="editar-profissional" >
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