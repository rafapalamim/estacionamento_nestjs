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
  })
  em_aberto?: boolean;

  @ApiProperty({
    required: false,
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
