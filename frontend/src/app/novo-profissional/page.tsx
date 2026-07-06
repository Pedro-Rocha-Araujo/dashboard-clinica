import "./novo-profissional.css"

export default function NovoProfissional() {
  return (
    <section className="novo-profissional">
      <h2><i className="fa-solid fa-circle-plus"></i> Novo Profissional</h2>
      
      <form className="novo-profissional" >
        <input 
          placeholder="Nome do Profissional"
          required 
        />

        <input 
          placeholder="Especialidade do Profissional"
          required 
        />
        <button>Cadastrar</button>
      </form>
    </section>
  )
}