'use client'

import { redirect } from "next/navigation"

interface idProps {
  id: string
}

export default function Botoes({ id }: idProps) {
  return (
    <div className="botoes">
      <button onClick={()=>redirect(`/encaminhar/${id}`)} className="blue">Encaminhar</button>
      <button className="red">Finalizar</button>
    </div>
  )
}