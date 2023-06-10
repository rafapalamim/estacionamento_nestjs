import { ApiProperty } from '@nestjs/swagger';
import TimestampsDTO from 'src/modules/@base/dto/timestamps.dto';
import { CreateVeiculoInput } from './create.dto';
import { TipoVeiculoEnum } from 'src/modules/@base/enums/tipo.veiculo.enum';

export class UpdateVeiculoInput extends CreateVeiculoInput {
  @ApiProperty({
    required: false,
    description:
      'Informe o ID caso queira atualizar o recurso. Se não informar, o recurso será criado',
  })
  id?: number;
}

export class UpdateVeiculoOutput extends TimestampsDTO {
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
