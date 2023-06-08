import { ApiProperty } from '@nestjs/swagger';
import { CreateEstabelecimentoInput } from './create.dto';
import TimestampsDTO from 'src/modules/@base/dto/timestamps.dto';

export class UpdateEstabelecimentoInput extends CreateEstabelecimentoInput {
  @ApiProperty()
  id?: number;
}

export class UpdateEstabelecimentoOutput extends TimestampsDTO {
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
