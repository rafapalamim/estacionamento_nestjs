import { IFindService } from 'src/modules/@base/services/find.interface';
import { FindEstabelecimentoOutput } from '../dto/find.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import EstabelecimentosEntity from '../estabelecimentos.entity';
import { MessagesAPI } from 'src/utils/messages.helper';
import { Constants } from 'src/utils/constants.helper';
import { Repository } from 'typeorm';

@Injectable()
export default class EstabelecimentoFindService
  implements IFindService<FindEstabelecimentoOutput>
{
  constructor(
    @Inject(Constants.estabelecimentoRepositorio)
    private repository: Repository<EstabelecimentosEntity>,
  ) {}

  async execute(id: number): Promise<FindEstabelecimentoOutput> {
    const search = await this.repository.findOne({ where: { id } });
    if (!search)
      throw new NotFoundException(MessagesAPI.ESTABELECIMENTO.FIND.NOT_FOUND);

    return search;
  }
}
