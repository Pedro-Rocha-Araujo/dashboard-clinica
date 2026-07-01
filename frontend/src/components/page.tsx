import Link from "next/link"

export default function Dashboard() {
  return (
    <nav>

      <div className="header">
        <h1><Link href={`/`}>Clínica</Link></h1>
      </div>

      <div className="main">
        <ul>
          <li><Link href={`/novo-profissional`}>Gerar Senha</Link></li>
          <li><Link href={`/novo-profissional`}>Cadastrar Profissional</Link></li>
        </ul>
      </div>

    </nav>
  )
}