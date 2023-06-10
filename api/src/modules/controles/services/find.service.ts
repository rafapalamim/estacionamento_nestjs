import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import ControlesEntity from '../controles.entity';
import { IFindService } from 'src/modules/@base/services/find.interface';
import { FindControleOutput } from '../dto/find.dto';
import { MessagesAPI } from 'src/utils/messages.helper';
import { Repository } from 'typeorm';
import { Constants } from 'src/utils/constants.helper';

@Injectable()
export default class ControleFindService
  implements IFindService<FindControleOutput>
{
  constructor(
    @Inject(Constants.controleRepositorio)
    private repository: Repository<ControlesEntity>,
  ) {}

  async execute(id: number): Promise<FindControleOutput> {
    const find = await this.repository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!find) throw new NotFoundException(MessagesAPI.CONTROLE.FIND.NOT_FOUND);

    return find;
  }
}
