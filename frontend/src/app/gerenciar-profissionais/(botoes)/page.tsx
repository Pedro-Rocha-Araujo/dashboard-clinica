'use client'
import { redirect } from "next/navigation"

export default function Botoes() {
  return (
    <div className="botoes">
      <i onClick={()=>redirect("/editar-profissional")} className="fa-solid fa-pen-to-square fa-lg"></i>
      <i className="fa-solid fa-circle-xmark fa-lg"></i>
    </div>
  )
} 