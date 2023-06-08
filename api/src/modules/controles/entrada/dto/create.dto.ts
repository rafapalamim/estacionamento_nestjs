import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { TipoVeiculoEnum } from 'src/modules/@base/enums/tipo.veiculo.enum';

export class CreateEntradaInput {
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty({
    message: 'O ID do estabelecimento é um campo obrigatório',
  })
  estabelecimento_id: number;

  @ApiProperty({
    example: 'ABC1234',
    maxLength: 7,
  })
  @IsNotEmpty({
    message: 'A placa do veículo é um campo obrigatório',
  })
  veiculo_placa: string;

  @ApiProperty()
  veiculo_tipo: TipoVeiculoEnum;

  @ApiProperty()
  veiculo_marca?: string;

  @ApiProperty()
  veiculo_modelo?: string;

  @ApiProperty()
  veiculo_cor?: string;
}

export class CreateEntradaOutput {
  @ApiProperty({
    example: 1,
    description:
      'Identificado único da entrada no estabelecimento com veículo informado',
  })
  id: number;
}
