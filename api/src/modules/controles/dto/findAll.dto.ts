import { ApiProperty } from '@nestjs/swagger';
import { PaginationDTO } from 'src/modules/@base/dto/pagination.dto';
import { FindControleOutput } from './find.dto';
import { TipoVeiculoEnum } from 'src/modules/@base/enums/tipo.veiculo.enum';

export class FindAllControleInput {
  @ApiProperty({
    required: false,
  })
  estabelecimento_id?: number;

  @ApiProperty({
    required: false,
  })
  veiculo_id?: number;

  @ApiProperty({
    required: false,
  })
  veiculo_tipo?: TipoVeiculoEnum;

  @ApiProperty({
    required: false,
  })
  pagina?: number;

  @ApiProperty({
    required: false,
    description:
      "Exibe as entradas em aberto. Caso o campo 'em_aberto' seja verdadeiro, o campo cancelados por definição será falso",
  })
  em_aberto?: boolean;

  @ApiProperty({
    required: false,
    description:
      "Exibe as entradas canceladas. Caso o campo 'em_aberto' seja verdadeiro, o campo cancelados por definição será falso",
  })
  cancelados?: boolean;
}

export class FindAllControleOutput {
  @ApiProperty({
    type: [FindControleOutput],
    required: false,
  })
  data: FindControleOutput[];

  @ApiProperty({
    type: PaginationDTO,
  })
  pagination: PaginationDTO;
}
