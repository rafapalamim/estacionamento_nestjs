export class FindAllEstabelecimentoDto {
  cnpj?: string;
  nome?: string;
  endereco?: string;
  pagina?: number = 0;
}

class Estabelecimento {
  id: number;
  nome: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  quantidade_vagas_motos: number;
  quantidade_vagas_carros: number;
  created_at: Date;
  updated_at: Date;
}

class Paginacao {
  totalDeRegistros: number;
  paginaAtual: number;
  ultimaPagina: number;
}

export class FindAllEstabelecimentoOutputDto {
  data: Estabelecimento[];
  paginacao: Paginacao;
}
