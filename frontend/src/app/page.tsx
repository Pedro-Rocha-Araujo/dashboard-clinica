import Botoes from "../components/botoes-home/page"
import "./home.css"

export default function Home() {
  return (
    <section className="home">
      <h2> <i className="fa-solid fa-house"></i> Página home</h2>
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
              <Botoes />
            </td>
          </tr>
        </tbody>

      </table>
    </section>
  );
}
