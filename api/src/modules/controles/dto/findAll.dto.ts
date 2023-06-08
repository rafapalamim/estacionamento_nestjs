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
  em_aberto?: boolean = true;

  @ApiProperty()
  cancelados?: boolean = false;

  @ApiProperty()
  pagina?: number;
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
