import Botoes from "../(botoes)/page"
import { Profissional } from "@/interfaces"

interface ProfissionaisAtivosProps {
  profissionaisAtivos: Profissional[]
}

export default function ProfissionaisAtivos({ profissionaisAtivos }: ProfissionaisAtivosProps) {

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
              <Botoes cadastrado={profissional.cadastrado} id={profissional._id} />
            </div>    
          )
        })
      ) : (
        <p>Nenhum profissional ativo no momento.</p>
      ) }

    </div>
  )
}