import { ApiProperty } from '@nestjs/swagger';
import TimestampsDTO from 'src/modules/@base/dto/timestamps.dto';
import { TipoVeiculoEnum } from 'src/modules/@base/enums/tipo.veiculo.enum';

export class FindVeiculoOutput extends TimestampsDTO {
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
