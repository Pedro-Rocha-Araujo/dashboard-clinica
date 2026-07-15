'use client'

import "../usuario.css"
import Link from "next/link"

export default function Login() {
  return (
    <section className="usuario">
      <div className="container">
        
        <div className="header">
          <h1>Login</h1>
        </div>

        <form className="main">
          <input type="text" placeholder="Digite um nome de Usuario" required />
          <input type="password" placeholder="Disite sua senha de acesso" required />
          <button>Fazer Login</button>
        </form>

        <div className="footer">
          <p>Não possui um cadstro? <Link href={`/auth/cadstro`}>Criar Conta.</Link></p>
        </div>
        
      </div>
    </section>
  )
}