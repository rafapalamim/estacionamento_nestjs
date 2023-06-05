import { PartialType } from '@nestjs/swagger';
import { CreateEstabelecimentoDto } from './create-estabelecimento.dto';

export class UpdateEstabelecimentoDto extends PartialType(
  CreateEstabelecimentoDto,
) {}

export class UpdateEstabelecimentoOutputDto {
  id: number;
  nome: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  quantidade_vagas_motos: number;
  quantidade_vagas_carros: number;
}
