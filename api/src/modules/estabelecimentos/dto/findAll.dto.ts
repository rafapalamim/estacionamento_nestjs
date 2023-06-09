import { ApiProperty } from '@nestjs/swagger';
import { PaginationDTO } from 'src/modules/@base/dto/pagination.dto';
import TimestampsDTO from 'src/modules/@base/dto/timestamps.dto';

export class FindAllEstabelecimentoInput {
  @ApiProperty({
    required: false,
  })
  nome?: string;

  @ApiProperty({
    required: false,
  })
  cnpj?: string;

  @ApiProperty({
    required: false,
  })
  endereco?: string;

  @ApiProperty({
    required: false,
  })
  ativo?: boolean;

  @ApiProperty({
    required: false,
    default: 0,
  })
  pagina?: number;
}

class EstabelecimentosDTO extends TimestampsDTO {
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
}

export class FindAllEstabelecimentoOutput {
  @ApiProperty({
    type: [EstabelecimentosDTO],
  })
  data: EstabelecimentosDTO[];

  @ApiProperty({
    type: PaginationDTO,
  })
  pagination: PaginationDTO;
}
