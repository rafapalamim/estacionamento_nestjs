import BaseService from 'src/modules/@base/services/service.base';
import { IFindService } from 'src/modules/@base/services/find.interface';
import { FindEstabelecimentoOutput } from '../dto/find.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import EstabelecimentosEntity from '../estabelecimentos.entity';

@Injectable()
export default class EstabelecimentoFindService
  extends BaseService<EstabelecimentosEntity>
  implements IFindService<FindEstabelecimentoOutput>
{
  async execute(id: number): Promise<FindEstabelecimentoOutput> {
    const search = await this.repository.findOneBy({ id });

    if (!search)
      throw new BadRequestException(
        'Não foi possível encontrar o estabelecimento',
      );

    return search;
  }
}
