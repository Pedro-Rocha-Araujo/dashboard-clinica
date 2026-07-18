export default function CadastrarProfissional() {
  return (
    <section>
      <h2>Cadastrar Profissional - Nome do Profissional</h2>
      <form>
        <input 
          type="text" 
          required 
          placeholder="Usuario de login do profissional" 
        />
        <input 
          type="password" 
          required 
          placeholder="Senha de login do profisisonal" 
        />
      </form>
    </section>
  )
}