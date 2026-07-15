'use client'

import "../usuario.css"
import Link from "next/link"

export default function Cadastro() {
  return (
    <section className="usuario">
      <div className="container">
        
        <div className="header">
          <h1>Cadastro</h1>
        </div>

        <form className="main">
          <input type="text" placeholder="Digite um nome de Usuario" required />
          <input type="password" placeholder="Disite sua senha de acesso" required />
          <button>Cadastrar</button>
        </form>

        <div className="footer">
          <p>Já possui cadstro? <Link href={`/auth/login`}>Logar-se.</Link></p>
        </div>
        
      </div>
    </section>
  )
}