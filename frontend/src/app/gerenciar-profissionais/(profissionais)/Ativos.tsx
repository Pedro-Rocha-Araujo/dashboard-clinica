'use client'
import Botoes from "../(botoes)/page"
import { toast } from "react-toastify"
import axios from "axios"
import { useState, useEffect } from "react"

interface Profissional {
  _id: string,
  nome: string,
  especialidade: string,
  ativo: boolean
}

export default function ProfissionaisAtivos() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([])

  async function getProfissionais() {
    try {
      const response = await axios.get("http://localhost:4000/profissional")
      setProfissionais(response.data)
    } catch(erro) {
      console.log(erro)
      toast.error("Erro ao buscar os profissionais no banco.")
    }
  }

  useEffect(()=>{
    getProfissionais()
  }, [])

  return (
    <div className="profissionais">
      { profissionais.length > 0 ? (
        profissionais.map((profissional)=>{
          return (
            <div key={profissional._id} className="profissional">
              <div className="informacoes">
                <h4>{profissional.nome}</h4>
                <p>{profissional.especialidade}</p>
              </div>
              <Botoes getProfissionais={getProfissionais} id={profissional._id} />
            </div>    
          )
        })
      ) : (
        <p>Nenhum profissional ativo no momento.</p>
      ) }

    </div>
  )
}