import BaseService from 'src/modules/@base/services/service.base';
import { IFindService } from 'src/modules/@base/services/find.interface';
import { FindEstabelecimentoOutput } from '../dto/find.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import EstabelecimentosEntity from '../estabelecimentos.entity';
import { MessagesAPI } from 'src/utils/messages.helper';

@Injectable()
export default class EstabelecimentoFindService
  extends BaseService<EstabelecimentosEntity>
  implements IFindService<FindEstabelecimentoOutput>
{
  async execute(id: number): Promise<FindEstabelecimentoOutput> {
    const search = await this.repository.findOneBy({ id });

    if (!search)
      throw new NotFoundException(MessagesAPI.ESTABELECIMENTO.FIND.NOT_FOUND);

    return search;
  }
}
