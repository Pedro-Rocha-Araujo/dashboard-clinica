import "./editar-profissional.css"

export default function EditarProfissional() {
  return (
    <section className="editar-profissional">
      <h2> <i className="fa-solid fa-pen-to-square"></i> Editar Profissional</h2>
      
      <form className="editar-profissional" >
        <input 
          placeholder="Nome do Profissional"
          required 
        />

        <input 
          placeholder="Especialidade do Profissional"
          required 
        />
        <button>Editar</button>
      </form>
    </section>
  )
}