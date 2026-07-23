'use client'

import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"
import Link from "next/link"
import Botao from "./botao"
import { Token } from "@/interfaces"

export default function Dashboard() {
  const [token, setToken] = useState<Token>()
  const [menu, setMenu] = useState<boolean>(false)

  useEffect(()=>{
   const cookie = Cookies.get("token")
   if(!cookie) {
    return 
   }
   setToken(jwtDecode(cookie))
  }, [])

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
        { token?.tipo === "RECEPCAO" ? (
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
        ): (
          <ul>
            <li className={menu===true?"esconder":""}>
              <Link href={`/`}>Agendamentos</Link>
            </li>

            <li className={menu===true?"esconder":""}>
              <Link href={`/`}>Perfil</Link>
            </li>
            
            <li className="ultimo">
              <Botao menu={menu} gerenciarMenu={gerenciarMenu} />
            </li>
          </ul>
        ) }
      </div>

    </nav>
  )
}