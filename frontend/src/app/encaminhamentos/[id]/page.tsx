import "./senhas-profissional.css"

export default function SenhasProfissional() {
  return (
    <section className="senhas-profissional">
      <h2> <i className="fa-solid fa-list-ol"></i> Senhas | Nome do Profissional</h2>

      <table>
        <thead>
          <tr>
            <th>Senha</th>
            <th>Paciente</th>
            <th>Status</th>
            <th>Funcionalidades</th>
          </tr>
          
        </thead>

        <tbody>
          <tr key={"senha._id"}>
            <td>senha.numero</td>
            <td>senha.paciente.nome</td>
            <td>senha.status</td>
            <td>
              <div className="botoes">
                <button className="blue">Finalizar</button>
                <button className="red">Encerrar</button>
              </div>
            </td>
          </tr>
        </tbody>

      </table>
    </section>
  )
}