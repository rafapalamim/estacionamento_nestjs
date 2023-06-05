import { ApiProperty } from '@nestjs/swagger';

export class FindAllEstabelecimentoDto {
  @ApiProperty({
    required: false,
  })
  cnpj?: string;

  @ApiProperty({
    required: false,
  })
  nome?: string;

  @ApiProperty({
    required: false,
  })
  endereco?: string;

  @ApiProperty({
    required: false,
    default: 0,
  })
  pagina?: number;
}

class Estabelecimento {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  endereco: string;

  @ApiProperty()
  telefone: string;

  @ApiProperty()
  quantidade_vagas_motos: number;

  @ApiProperty()
  quantidade_vagas_carros: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

class Paginacao {
  @ApiProperty()
  totalDeRegistros: number;

  @ApiProperty()
  paginaAtual: number;

  @ApiProperty()
  ultimaPagina: number;
}

export class FindAllEstabelecimentoOutputDto {
  @ApiProperty({
    type: [Estabelecimento],
  })
  data: Estabelecimento[];

  @ApiProperty()
  paginacao: Paginacao;
}
