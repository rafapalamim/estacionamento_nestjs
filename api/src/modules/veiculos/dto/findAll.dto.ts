import { ApiProperty } from '@nestjs/swagger';
import { PaginationDTO } from 'src/modules/@base/dto/pagination.dto';
import TimestampsDTO from 'src/modules/@base/dto/timestamps.dto';

export class FindAllVeiculoInput {
  @ApiProperty()
  placa?: string;

  @ApiProperty()
  cor?: string;

  @ApiProperty()
  modelo?: string;

  @ApiProperty()
  ativo?: boolean;

  @ApiProperty()
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
  tipo: string;
}

export class FindAllVeiculoOutput {
  @ApiProperty({
    type: [VeiculosDTO],
  })
  data: VeiculosDTO[];

  @ApiProperty({
    type: PaginationDTO,
  })
  pagination: PaginationDTO;
}
