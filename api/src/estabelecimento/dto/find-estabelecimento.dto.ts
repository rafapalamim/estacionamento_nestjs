export class FindEstabelecimentoOutputDto {
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
