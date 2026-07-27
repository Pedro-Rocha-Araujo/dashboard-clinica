import { Profissional } from "@/interfaces"
import axios from "axios"
import Cookies from "js-cookie"
import { toast } from "react-toastify"
import { redirect } from "next/navigation"

interface ProfissionaisAtivosProps {
  profissionaisAtivos: Profissional[]
  setProfisisonaisAtivos: (profissionais:Profissional[])=>void
}

export default function ProfissionaisAtivos(
  { profissionaisAtivos, setProfisisonaisAtivos }: ProfissionaisAtivosProps) 
{

  async function desativarProfissional(id: string) {
    try {
      const token = Cookies.get("token")
      await axios.patch(
        `http://localhost:4000/profissional/${id}`, 
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        } 
      )
      setProfisisonaisAtivos(profissionaisAtivos.filter((profissional)=>{
        return profissional._id !== id
      }))
      toast.success("Profissional desativado.")
    } catch(erro) {
      console.log(erro)
      toast.error("Erro ao desativar profissional.")
    }
  }

  return (
    <div className="profissionais">
      { profissionaisAtivos.length > 0 ? (
        profissionaisAtivos.map((profissional)=>{
          return (
            <div key={profissional._id} className="profissional">
              <div className="informacoes">
                <h4>{profissional.nome}</h4>
                <p>{profissional.especialidade}</p>
              </div>

              <div className="botoes">
                { profissional.cadastrado === false && (
                  <i 
                    onClick={()=>redirect("/recepcao/cadastrar-profissional/"+profissional._id)} 
                    className="fa-solid fa-clipboard fa-lg"
                  ></i>
                ) }

                <i 
                  onClick={()=>desativarProfissional(profissional._id)}
                  className="fa-solid fa-circle-xmark fa-lg"
                ></i>
              </div>
            </div>    
          )
        })
      ) : (
        <p className="feedback">Nenhum profissional ativo no momento.</p>
      ) }

    </div>
  )
}