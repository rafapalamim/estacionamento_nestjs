import { ApiProperty } from '@nestjs/swagger';

export class FindAllVeiculosDto {
  @ApiProperty({
    required: false,
  })
  placa?: string;

  @ApiProperty({
    required: false,
    default: 0,
  })
  pagina?: number;
}

class Veiculo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  marca: string;

  @ApiProperty()
  modelo: string;

  @ApiProperty()
  cor: string;

  @ApiProperty()
  placa: string;

  @ApiProperty()
  tipo: string;

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

export class FindAllVeiculosOutputDto {
  @ApiProperty({
    type: [Veiculo],
  })
  data: Veiculo[];

  @ApiProperty()
  paginacao: Paginacao;
}
