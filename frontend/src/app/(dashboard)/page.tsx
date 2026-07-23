'use client'

import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { Token } from "@/interfaces"
import { useState, useEffect } from "react"
import HomeRecepcao from "./(home)/recepcionista"
import HomeProfissional from "./(home)/profissional"

export default function Home() {
  const [token, setToken] = useState<Token | null>(null)
  
  const cookie = Cookies.get("token")
  useEffect(()=> {
    if(!cookie) {
      return
    }
    setToken(jwtDecode<Token>(cookie))
  }, [])
  if(!token || !cookie) {
    return null
  }

  return (
    token?.tipo === "RECEPCAO" ? (
      <HomeRecepcao cookie={cookie} token={token} />
    ) : (
      <HomeProfissional token={token} />
    )
  )
}