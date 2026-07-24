import axios from "axios"
import { toast } from "react-toastify"
import { Profissional } from "@/interfaces"

interface ProfissionaisInativosProps {
  profissionaisInativos: Profissional[]
}

export default function ProfissionaisInativos({ profissionaisInativos }: ProfissionaisInativosProps) {
  async function reativarProfissional(id: string) {
    try {
      await axios.patch(`http://localhost:4000/profissional/ativar/${id}`)
      toast.success("Profissional Reativado.")
      profissionaisInativos.filter((i)=>{
        return i._id !== id
      })
    } catch(erro) {
      console.log(erro)
      toast.error("Erro ao reativar o profissional.")
    }
  }

  return (
    <div className="profissionais inativos">
      { profissionaisInativos.length > 0 ? (
        profissionaisInativos.map((profissional)=> {
          return (
            <div key={profissional._id} className="profissional">
              <div className="informacoes">
                <h4>{profissional.nome}</h4>
                <p>{profissional.especialidade}</p>
              </div>
              <div className="botoes">
                <i 
                  onClick={()=>reativarProfissional(profissional._id)} 
                  className="fa-solid fa-circle-check fa-lg"
                ></i>
              </div>
            </div>
          )
        })
      ): (
        <p className="feedback">Nenhum profissional inativo no momento.</p>
      ) }
      
    </div>
  )
}