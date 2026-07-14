export interface SenhaBody {
  paciente_id: string,
  profissional_id: string,
  nome: string
}

export interface SenhaParams {
  senha_id: string
}

export interface EncaminhamentoBody {
  nome: string,
  cpf: number,
  telefone: number,
  profissional_id: string,
}