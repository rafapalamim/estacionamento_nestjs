import { ApiProperty } from '@nestjs/swagger';
import TimestampsDTO from 'src/modules/@base/dto/timestamps.dto';

export class FindControleOutput extends TimestampsDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  estabelecimento_id: number;

  @ApiProperty()
  veiculo_id: number;

  @ApiProperty()
  data_entrada: Date;

  @ApiProperty()
  data_saida: Date | null;
}
