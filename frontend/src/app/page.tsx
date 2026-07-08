'use client'

interface Paciente {
  _id: string,
  nome: string,
  createdAt: string,
  updatedAt: string
}

interface SenhaAguardando {
  _id: string,
  numero: number,
  paciente: Paciente,
  status: "Aguardando" | "NaFila" | "Finalizado" | "Cancelado",
  createdAt: string,
  updatedAt: string
}

import { useState, useEffect } from "react"
import axios from "axios"
import Botoes from "../components/botoes-home/page"
import "./home.css"

export default function Home() {
  const [senhas, setSenhas] = useState<SenhaAguardando[]>([])

  async function getSenhas() {
    try {
      const response = await axios.get("http://localhost:4000/senha")
      setSenhas(response.data)
    } catch(erro) {
      console.log(erro)
    }
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
                    <td>{senha.numero}</td>
                    <td>{senha.paciente.nome}</td>
                    <td>{senha.status}</td>
                    <td>
                      <Botoes />
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
    </section>
  );
}
