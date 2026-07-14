'use client'
import "./erro.css"
import { redirect } from "next/navigation"

export default function NotFound() {
  return (
    <section className="erro">
      <h2>Erro!</h2>
      <p>A página em questão não foi encontrada</p>
      <button onClick={()=>redirect("/")}>Ir para a home.</button>
    </section>
  )
}