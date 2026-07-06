'use client'

import { redirect } from "next/navigation"

export default function Botoes() {
  return (
    <div className="botoes">
      <button onClick={()=>redirect("/encaminhar/")} className="blue">Encaminhar</button>
      <button className="red">Finalizar</button>
    </div>
  )
}