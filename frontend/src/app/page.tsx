import "./home.css"

export default function Home() {
  return (
    <section className="home">
      <h2>Página home</h2>
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

          <tr>
            <td>1</td>
            <td>João Souza Ramos</td>
            <td>Aguardando</td>
            <td>
              <div className="botoes">
                <button className="blue">Encaminhar</button>
                <button className="red">Finalizar</button>
              </div>
            </td>
          </tr>
        </tbody>

      </table>
    </section>
  );
}
