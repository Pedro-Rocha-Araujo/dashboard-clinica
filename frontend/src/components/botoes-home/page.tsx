'use client'

import { redirect } from "next/navigation"
import axios from "axios"
import { toast } from "react-toastify"

interface idProps {
  id: string
}

export default function Botoes({ id }: idProps) {
  
  async function finalizarSenha(id: string) {
    try {
      await axios.patch(`http://localhost:4000/senha/${id}/cancelar`)
      toast.success("Atendimento Finalizado.")
    } catch(erro) {
      console.log(erro)
      toast.error("Erro ao finalizar o atendimento.")
    }
  }

  return (
    <div className="botoes">
      <button onClick={()=>redirect(`/encaminhar/${id}`)} className="blue">Encaminhar</button>
      <button onClick={()=>finalizarSenha(id)} className="red">Finalizar</button>
    </div>
  )
}