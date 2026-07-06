import Botoes from "./(botoes)/page"
import "./gerenciar-profissionais.css"

export default function GerenciarProfissionais() {
  return (
    <section className="gerenciar-profissionais">
      <h2> <i className="fa-solid fa-users"></i> Gerenciar Profissionais</h2>
      <h3>Profissionais Ativos</h3>
      <div className="profissionais">

        <div className="profissional">

          <div className="informacoes">
            <h4>André Matos</h4>
            <p>Dermatologista</p>
          </div>

          <Botoes />

        </div>
        
      </div>

      <h3>Profissionais Inativos</h3>
      <div className="profissionais inativos">

          <div className="profissional">

          <div className="informacoes">
            <h4>João Silva</h4>
            <p>Clinico Geral</p>
          </div>

          <div className="botoes">
            <i className="fa-solid fa-circle-check fa-lg"></i>
          </div>

        </div>
      
      </div>

    </section>
  )
}