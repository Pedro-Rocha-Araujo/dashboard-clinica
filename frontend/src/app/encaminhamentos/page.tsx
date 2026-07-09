import "./encaminhamentos.css"

export default function Encaminhamentos() {
  return (
    <section className="encaminhamentos">
      <h2> <i className="fa-solid fa-list"></i> Escolha o Profissional</h2>

      <div className="profissionais">

          <div className="profissional">
            <div className="informacoes">
              <h3>profissional.nome</h3>
              <p>profissional.especialidade</p>
            </div>
            <i className="fa-solid fa-eye fa-xl"></i>
          </div>

      </div>
    </section>
  )
}