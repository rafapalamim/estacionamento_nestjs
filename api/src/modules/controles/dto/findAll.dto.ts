import { ApiProperty } from '@nestjs/swagger';
import { PaginationDTO } from 'src/modules/@base/dto/pagination.dto';
import { FindControleOutput } from './find.dto';
import { TipoVeiculoEnum } from 'src/modules/@base/enums/tipo.veiculo.enum';

export class FindAllControleInput {
  @ApiProperty()
  estabelecimento_id?: number;

  @ApiProperty()
  veiculo_id?: number;

  @ApiProperty()
  veiculo_tipo?: TipoVeiculoEnum;

  @ApiProperty()
  pagina?: number;

  @ApiProperty()
  em_aberto?: boolean;

  @ApiProperty()
  cancelados?: boolean;
}

export class FindAllControleOutput {
  @ApiProperty({
    type: [FindControleOutput],
  })
  data: FindControleOutput[];

  @ApiProperty({
    type: PaginationDTO,
  })
  pagination: PaginationDTO;
}
