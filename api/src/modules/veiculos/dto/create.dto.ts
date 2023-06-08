import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateVeiculoInput {
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
    maxLength: 100,
  })
  @IsNotEmpty({
    message: 'O modelo do veículo é um campo obrigatório',
  })
  modelo: string;

  @ApiProperty({
    example: 'Azul',
    maxLength: 50,
  })
  @IsNotEmpty({
    message: 'A cor do veículo é um campo obrigatório',
  })
  cor: string;

  @ApiProperty({
    examples: ['ABC1234', 'ABC1E34'],
    maxLength: 7,
  })
  @IsNotEmpty({
    message: 'A placa do veículo é um campo obrigatório',
  })
  placa: string;

  @ApiProperty({
    example: 'Hatch',
    maxLength: 50,
  })
  @IsNotEmpty({
    message: 'O tipo do veículo é um campo obrigatório',
  })
  tipo: string;
}

export class CreateVeiculoOutput {
  @ApiProperty({
    description: 'Identificador único do veículo na aplicação',
  })
  id: number;
}
