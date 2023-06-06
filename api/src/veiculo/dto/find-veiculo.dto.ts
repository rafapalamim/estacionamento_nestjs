import { ApiProperty } from '@nestjs/swagger';

export class FindVeiculoOutputDto {
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

  @ApiProperty({})
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
