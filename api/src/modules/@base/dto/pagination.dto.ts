import { ApiProperty } from '@nestjs/swagger';

export class PaginationDTO {
  @ApiProperty({
    description: 'Total de registros encontrados',
  })
  total: number;

  @ApiProperty()
  paginaAtual: number;

  @ApiProperty()
  ultimaPagina: number;
}
