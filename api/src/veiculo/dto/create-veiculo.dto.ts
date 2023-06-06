import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateVeiculoDto {
  @ApiProperty({
    example: 'Volkswagen',
    maxLength: 100,
  })
  @IsNotEmpty({
    message: 'A marca do veículo é um campo obrigatório',
  })
  marca: string;

  @ApiProperty({
    example: 'Gol',
    maxLength: 80,
  })
  @IsNotEmpty({
    message: 'O modelo do veículo é um campo obrigatório',
  })
  modelo: string;

  @ApiProperty({
    example: 'Vermelho',
    maxLength: 50,
  })
  @IsNotEmpty({
    message: 'A cor do veículo é um campo obrigatório',
  })
  cor: string;

  @ApiProperty({
    examples: ['BRA2E19', 'BRA2119'],
    maxLength: 7,
  })
  @IsNotEmpty({
    message: 'A placa do veículo é um campo obrigatório',
  })
  placa: string;

  @ApiProperty({
    example: 'Esportivo',
    maxLength: 50,
  })
  @IsNotEmpty({
    message: 'O tipo do veículo é um campo obrigatório',
  })
  tipo: string;
}

export class CreateVeiculoOutputDto {
  @ApiProperty({
    description: 'Identificador único do veículo na aplicação',
  })
  id: number;
}

export class CreateVeiculoErrorOutputDto {
  @ApiProperty({
    default: 400,
  })
  statusCode: number;

  @ApiProperty()
  message: string[];

  @ApiProperty({
    default: 'bad request',
  })
  error: string;
}
