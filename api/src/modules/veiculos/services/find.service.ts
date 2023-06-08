import BaseService from 'src/modules/@base/services/service.base';
import { IFindService } from 'src/modules/@base/services/find.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import VeiculosEntity from '../veiculos.entity';
import { FindVeiculoOutput } from '../dto/find.dto';
import { MessagesAPI } from 'src/utils/messages.helper';

@Injectable()
export default class VeiculoFindService
  extends BaseService<VeiculosEntity>
  implements IFindService<FindVeiculoOutput>
{
  async execute(id: number): Promise<FindVeiculoOutput> {
    const search = await this.repository.findOneBy({ id });

    if (!search)
      throw new NotFoundException(MessagesAPI.VEICULO.FIND.NOT_FOUND);

    return search;
  }
}
