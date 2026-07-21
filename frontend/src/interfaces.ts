export interface Paciente {
  _id: string,
  nome: string,
  cpf: string,
  telefone: string,
  createdAt: string,
  updatedAt: string
}

export interface Profissional {
  _id: string,
  nome: string,
  ativo: boolean,
  especialidade: string,
  cadastrado: boolean,
  createdAt: string,
  updatedAt: string
}

export interface Senha {
  _id: string,
  numero: number,
  paciente: Paciente,
  status: "Aguardando" | "NaFila" | "Atendido" | "Finalizado",
  profissional: Profissional,
  createdAt: string,
  updatedAt: string
}

export interface Usuario {
  _id: string,
  usuario: string,
  senha: string,
  profissional?: Profissional
}

export interface Token {
  id: string,
  tipo: "RECEPCAO" | "PROFISSIONAL",
  usuario: string
}