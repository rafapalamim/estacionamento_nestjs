import { IFindService } from 'src/modules/@base/services/find.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import VeiculosEntity from '../veiculos.entity';
import { FindVeiculoOutput } from '../dto/find.dto';
import { MessagesAPI } from 'src/utils/messages.helper';
import { Constants } from 'src/utils/constants.helper';
import { Repository } from 'typeorm';

@Injectable()
export default class VeiculoFindService
  implements IFindService<FindVeiculoOutput>
{
  constructor(
    @Inject(Constants.veiculoRepositorio)
    private repository: Repository<VeiculosEntity>,
  ) {}

  async execute(id: number): Promise<FindVeiculoOutput> {
    const search = await this.repository.findOneBy({ id });

    if (!search)
      throw new NotFoundException(MessagesAPI.VEICULO.FIND.NOT_FOUND);

    return search;
  }
}
