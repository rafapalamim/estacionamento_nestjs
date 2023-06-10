import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { TipoVeiculoEnum } from 'src/modules/@base/enums/tipo.veiculo.enum';

export class CreateEntradaInput {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({
    message: 'O ID do estabelecimento é um campo obrigatório',
  })
  estabelecimento_id: number;

  @ApiProperty({
    example: 'ABC1234',
    maxLength: 7,
    required: true,
  })
  @IsNotEmpty({
    message: 'A placa do veículo é um campo obrigatório',
  })
  veiculo_placa: string;

  @ApiProperty({
    required: true,
    examples: ['MOTO', 'CARRO'],
    enum: TipoVeiculoEnum,
  })
  veiculo_tipo: TipoVeiculoEnum;

  @ApiProperty({
    required: false,
    description: 'Informe a marca para cadastrar o veículo (caso não exista)',
  })
  veiculo_marca?: string;

  @ApiProperty({
    required: false,
    description: 'Informe o modelo para cadastrar o veículo (caso não exista)',
  })
  veiculo_modelo?: string;

  @ApiProperty({
    required: false,
    description: 'Informe a cor para cadastrar o veículo (caso não exista)',
  })
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
