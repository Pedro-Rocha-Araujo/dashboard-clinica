import "./gerar-senha.css"

export default function GerarSenha() {
  return (
    <section className="gerar-senha">
      <h2>Gerar Senha</h2>
      <form>
        <input type="text" required placeholder="Digite o nome do Paciente" />
        <button>Gerar senha</button>
      </form>
    </section>
  )
}