'use client'

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"

interface Profissional {
  _id: string,
  nome: string,
  especialidade: string,
  ativo: boolean
}

export default function ProfissionaisInativos() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([])

  async function getProfissionais() {
    try {
      const response = await axios.get("http://localhost:4000/profissional/inativos")
      setProfissionais(response.data)
    } catch(erro) {
      console.log(erro)
      toast.error("Erro ao buscar profissionais.")
    }
  }

  useEffect(()=>{
    getProfissionais()
  }, [])

  async function reativarProfissional(id: string) {
    try {
      await axios.patch(`http://localhost:4000/profissional/ativar/${id}`)
      toast.success("Profissional reativado com sucesso")
      await getProfissionais()
    } catch(erro) {
      console.log(erro)
      toast.error("Erro ao reativar o profissional.")
    }
  }

  return (
    <div className="profissionais inativos">
      { profissionais.length > 0 ? (
        profissionais.map((profissional)=> {
          return (
            <div key={profissional._id} className="profissional">
              <div className="informacoes">
                <h4>{profissional.nome}</h4>
                <p>{profissional.especialidade}</p>
              </div>
              <div className="botoes">
                <i 
                  onClick={()=>reativarProfissional(profissional._id)} 
                  className="fa-solid fa-circle-check fa-lg"
                ></i>
              </div>
            </div>
          )
        })
      ): (
        <p>Nenhum profissional inativo no momento.</p>
      ) }
      
    </div>
  )
}