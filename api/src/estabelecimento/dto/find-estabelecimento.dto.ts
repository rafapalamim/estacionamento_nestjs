import { ApiProperty } from '@nestjs/swagger';

export class FindEstabelecimentoOutputDto {
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

  @ApiProperty({})
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
