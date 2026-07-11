'use client'

import { useState } from "react"
import Link from "next/link"
import Botao from "./botao"

export default function Dashboard() {
  const [menu, setMenu] = useState<boolean>(false)

  function gerenciarMenu() {
    if(menu === true) {
      setMenu(false)
    }else {
      setMenu(true)
    }
  }

  return (
    <nav>

      <div className="header">
        <h1><Link href={`/`}>Clínica</Link></h1>
      </div>

      <div className="main">
        <ul>
          <li className={menu===true?"esconder":""}>
            <Link href={`/gerar-senha`}>Gerar Senha</Link>
          </li>

          <li className={menu===true?"esconder":""}>
            <Link href={`/novo-profissional`}>Cadastrar Profissional</Link>
          </li>

          <li className={menu===true?"esconder":""}>
            <Link href={`/gerenciar-profissionais`}>Gerenciar Profissionais</Link>
          </li>

          <li className={menu===true?"esconder":""}>
            <Link href={`/encaminhamentos`}>Ver Encaminhamentos</Link>
          </li>
          
          <li className="ultimo">
            <Botao menu={menu} gerenciarMenu={gerenciarMenu} />
          </li>
        </ul>
      </div>

    </nav>
  )
}