import Link from "next/link"

export default function Dashboard() {
  return (
    <nav>

      <div className="header">
        <h1><Link href={`/`}>Clínica</Link></h1>
      </div>

      <div className="main">
        <ul>
          <li><Link href={`/gerar-senha`}>Gerar Senha</Link></li>
          <li><Link href={`/novo-profissional`}>Cadastrar Profissional</Link></li>
          <li className="ultimo"><Link href={`/encaminhamentos`}>Ver Encaminhamentos</Link></li>
        </ul>
      </div>

    </nav>
  )
}