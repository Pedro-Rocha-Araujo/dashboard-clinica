'use client'
import { Profissional } from "@/interfaces"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import "./encaminhamentos.css"
import Cookies from "js-cookie"

export default function Encaminhamentos() {
  const router = useRouter()

  const token = Cookies.get("token")

  const [profissionais, setProfissionais] = useState<Profissional[]>()

  useEffect(()=>{
    async function getProfissionais() {
      try {
        const response = await axios.get("http://localhost:4000/profissional", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProfissionais(response.data)
      } catch(erro) {
        console.log(erro)
      }
    }
    getProfissionais()
  }, [])



  function direcionarSenhaProfissional(id: string) {
    router.push(`/encaminhamentos/${id}`)
  }

  return (
    <section className="encaminhamentos">
      <h2> <i className="fa-solid fa-list-ol"></i> Escolha o Profissional</h2>

      <div className="profissionais">

        {profissionais?.map((profissional)=>{
          return (
            <div key={profissional._id} onClick={()=>direcionarSenhaProfissional(profissional._id)} className="profissional pop">
              <div className="informacoes">
                <h4>{profissional.nome}</h4>
                <p>{profissional.especialidade}</p>
              </div>
              <i className="fa-solid fa-eye fa-xl"></i>
            </div>
          )
        })}

      </div>
    </section>
  )
}