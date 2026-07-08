import "./encaminhamento.css"

export default function Encaminhamento() {
  return (
    <section className="encaminhamento">
      <h2> <i className="fa-solid fa-circle-chevron-right"></i> Encaminhar Paciente</h2>
      <form>
        <input type="text" required placeholder="Nome do Paciente" />
        <input type="number" required placeholder="CPF do Paciente" />
        <input type="number" required placeholder="Telefone do Paciente" />
        <div className="profissionais">
          <h3>Escolher Profissional</h3>
          <select defaultValue="">
            <option value=""  disabled selected>Selecionar Profissional...</option>
          </select>
        </div>
        <button>Encaminhar Paciente</button>
      </form>
    </section>
  )
}