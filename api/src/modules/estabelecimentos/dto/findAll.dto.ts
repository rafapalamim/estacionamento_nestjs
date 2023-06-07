import { ApiProperty } from '@nestjs/swagger';
import { PaginationDTO } from 'src/modules/@base/dto/pagination.dto';
import TimestampsDTO from 'src/modules/@base/dto/timestamps.dto';

export class FindAllEstabelecimentoInput {
  @ApiProperty()
  nome?: string;

  @ApiProperty()
  cnpj?: string;

  @ApiProperty()
  endereco?: string;

  @ApiProperty()
  ativo?: boolean;

  @ApiProperty()
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
