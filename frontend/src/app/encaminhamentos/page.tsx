'use client'

import { useRouter } from "next/navigation"
import "./encaminhamentos.css"

export default function Encaminhamentos() {
  const router = useRouter()

  function direcionarSenhaProfissional(id: string) {
    router.push(`/encaminhamentos/${id}`)
  }

  return (
    <section className="encaminhamentos">
      <h2> <i className="fa-solid fa-list-ol"></i> Escolha o Profissional</h2>

      <div className="profissionais">

          <div onClick={()=>direcionarSenhaProfissional("id-profissioal")} className="profissional pop">
            <div className="informacoes">
              <h3>profissional.nome</h3>
              <p>profissional.especialidade</p>
            </div>
            <i className="fa-solid fa-eye fa-xl"></i>
          </div>

      </div>
    </section>
  )
}