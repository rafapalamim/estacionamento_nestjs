import { ApiProperty } from '@nestjs/swagger';
import { PaginationDTO } from 'src/modules/@base/dto/pagination.dto';
import TimestampsDTO from 'src/modules/@base/dto/timestamps.dto';
import { TipoVeiculoEnum } from 'src/modules/@base/enums/tipo.veiculo.enum';

export class FindAllVeiculoInput {
  @ApiProperty({
    required: false,
  })
  placa?: string;

  @ApiProperty({
    required: false,
  })
  cor?: string;

  @ApiProperty({
    required: false,
  })
  modelo?: string;

  @ApiProperty({
    required: false,
  })
  ativo?: boolean;

  @ApiProperty({
    required: false,
  })
  pagina?: number;
}

class VeiculosDTO extends TimestampsDTO {
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
  tipo: TipoVeiculoEnum;
}

export class FindAllVeiculoOutput {
  @ApiProperty({
    type: [VeiculosDTO],
    required: false,
  })
  data: VeiculosDTO[];

  @ApiProperty({
    type: PaginationDTO,
  })
  pagination: PaginationDTO;
}
