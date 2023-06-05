import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEstabelecimentoDto } from './create-estabelecimento.dto';

export class UpdateEstabelecimentoDto extends PartialType(
  CreateEstabelecimentoDto,
) {}

export class UpdateEstabelecimentoOutputDto {
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
