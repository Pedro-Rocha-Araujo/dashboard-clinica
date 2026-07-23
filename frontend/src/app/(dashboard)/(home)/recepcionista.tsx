'use client'
import { Senha } from "@/interfaces"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Botoes from "@/components/botoes-home/page"
import "./home.css"
import Cookies from "js-cookie"
import { Token } from "@/interfaces"

interface HomeParams {
  token: Token
}

export default function HomeRecepcao({ token }: HomeParams) {
  const router = useRouter()

  const [senhas, setSenhas] = useState<Senha[]>([])

  async function getSenhas() {
    try {
      const response = await axios.get("http://localhost:4000/senha", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setSenhas(response.data)
    } catch(erro) {
      console.log(erro)
    }
  }

  function sairConta() {
    Cookies.remove("token")
    router.replace("/auth/login")
  }

  useEffect(()=>{
    getSenhas()
  }, [])

  return (
    <section className="home">
      <h2> <i className="fa-solid fa-house"></i> Página home</h2>
      <table>
        <thead>
          <tr>
            <th>Senha</th>
            <th>Paciente</th>
            <th>Status</th>
            <th>Funcionalidades</th>
          </tr>
          
        </thead>

        <tbody>
          { senhas.length > 0 ? (
            senhas.map((senha)=>{
              return (
                  <tr key={senha._id}>
                    <td data-label="Senha:">{senha.numero}</td>
                    <td data-label="Paciente:">{senha.paciente.nome}</td>
                    <td data-label="Status:">{senha.status}</td>
                    <td data-label="Funcionalidades:">
                      <Botoes id={senha._id} />
                    </td>
                  </tr>
              )
            })
          ): (
            <tr>
              <td colSpan={100}>
                <p>Nenhuma senha até o momento.</p>
              </td>
            </tr>
          ) }
        </tbody>

      </table>
      <br />
      <button className="red" onClick={()=>sairConta()}>Sair</button>
    </section>
  );
}
