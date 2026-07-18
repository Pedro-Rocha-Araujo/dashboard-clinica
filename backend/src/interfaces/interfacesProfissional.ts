export interface Profissional {
  _id: string,
  nome: string,
  especialidade: string,
  cadastrado: boolean,
  createdAt: string,
  updatedAt: string
}

export interface ProfissionalParams {
  profissional_id: string
}

export interface ProfissionalBody {
  nome: string,
  especialidade: string
}