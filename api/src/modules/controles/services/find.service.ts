import { Injectable, NotFoundException } from '@nestjs/common';
import BaseService from 'src/modules/@base/services/service.base';
import ControlesEntity from '../controles.entity';
import { IFindService } from 'src/modules/@base/services/find.interface';
import { FindControleOutput } from '../dto/find.dto';
import { MessagesAPI } from 'src/utils/messages.helper';

@Injectable()
export default class ControleFindService
  extends BaseService<ControlesEntity>
  implements IFindService<FindControleOutput>
{
  async execute(id: number): Promise<FindControleOutput> {
    const find = await this.repository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!find) throw new NotFoundException(MessagesAPI.CONTROLE.FIND.NOT_FOUND);

    return find;
  }
}
