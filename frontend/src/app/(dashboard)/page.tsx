'use client'

import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { Token } from "@/interfaces"
import HomeRecepcao from "./(home)/recepcionista"
import HomeProfissional from "./(home)/profissional"

export default function Home() {
  const cookie = Cookies.get("token")
  if(!cookie) {
    return null
  }
  const token:Token = jwtDecode(cookie)

  return (
    token.tipo === "RECEPCAO" ? (
      <HomeRecepcao />
    ) : (
      <HomeProfissional />
    )
  )
}