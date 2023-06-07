import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, Min } from 'class-validator';

export class CreateEstabelecimentoInput {
  @ApiProperty({
    example: 'John Doe',
    maxLength: 180,
  })
  @IsNotEmpty({
    message: 'O nome é um campo obrigatório',
  })
  nome: string;

  @ApiProperty({
    example: '14100200000199',
    description: 'CNPJ 14 dígitos (apenas números)',
    minLength: 14,
  })
  @IsNotEmpty({
    message: 'O CNPJ é um campo obrigatório',
  })
  cnpj: string;

  @ApiProperty({
    example: 'Avenida XPTO, 15',
    maxLength: 255,
  })
  @IsNotEmpty({
    message: 'O endereço é um campo obrigatório',
  })
  endereco: string;

  @ApiProperty({
    example: '5511983387812',
    description:
      'Telefone com Código de área + DDD + 9 ou 8 dígitos (apenas números)',
    maxLength: 13,
  })
  @IsNotEmpty({
    message: 'O telefone é um campo obrigatório',
  })
  telefone: string;

  @ApiProperty({
    example: 15,
    description: 'Quantidade de vagas para motos existentes no estabelecimento',
    default: 0,
  })
  @IsDefined({
    message: 'A quantidade de vagas para motos é um campo obrigatório',
  })
  @Min(0, {
    message:
      'A quantidade de vagas para motos deve ser igual ou maior que zero',
  })
  quantidade_vagas_motos: number;

  @ApiProperty({
    example: 30,
    description:
      'Quantidade de vagas para carros existentes no estabelecimento',
    default: 0,
  })
  @IsDefined({
    message: 'A quantidade de vagas para carros é um campo obrigatório',
  })
  @Min(0, {
    message:
      'A quantidade de vagas para carros deve ser igual ou maior que zero',
  })
  quantidade_vagas_carros: number;
}

export class CreateEstabelecimentoOutput {
  @ApiProperty({
    description: 'Identificador único do estabelecimento na aplicação',
  })
  id: number;
}
