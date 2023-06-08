import { ApiProperty } from '@nestjs/swagger';
import TimestampsDTO from 'src/modules/@base/dto/timestamps.dto';

export class FindEstabelecimentoOutput extends TimestampsDTO {
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
