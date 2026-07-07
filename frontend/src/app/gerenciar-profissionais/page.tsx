

import ProfissionaisAtivos from "./(profissionais)/Ativos"
import ProfissionaisInativos from "./(profissionais)/Inativos"
import "./gerenciar-profissionais.css"

export default function GerenciarProfissionais() {
  
  return (
    <section className="gerenciar-profissionais">
      <h2> <i className="fa-solid fa-users"></i> Gerenciar Profissionais</h2>
      
      <h3>Profissionais Ativos</h3>
      <ProfissionaisAtivos />

      <h3>Profissionais Inativos</h3>
      <ProfissionaisInativos />
    </section>
  )
}