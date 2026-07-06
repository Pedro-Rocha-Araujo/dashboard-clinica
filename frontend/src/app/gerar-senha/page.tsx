import "./gerar-senha.css"

export default function GerarSenha() {
  return (
    <section className="gerar-senha">
      <h2> <i className="fa-solid fa-list-ol"></i> Gerar Senha</h2>
      <form>
        <input type="text" required placeholder="Digite o nome do Paciente" />
        <button>Gerar senha</button>
      </form>
    </section>
  )
}