import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import BaseService from 'src/modules/@base/services/service.base';
import ControlesEntity from '../controles.entity';
import { IDestroyService } from 'src/modules/@base/services/destroy.interface';
import { MessagesAPI } from 'src/utils/messages.helper';

@Injectable()
export default class ControleDestroyService
  extends BaseService<ControlesEntity>
  implements IDestroyService
{
  async execute(id: number): Promise<void> {
    const find = await this.repository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!find) {
      throw new NotFoundException(MessagesAPI.CONTROLE.DESTROY.NOT_FOUND);
    }

    if (find.deleted_at !== null) {
      throw new BadRequestException(MessagesAPI.CONTROLE.DESTROY.BAD_REQUEST);
    }

    const deleted = await this.repository.softDelete({ id });

    if (deleted.affected < 1) {
      throw new InternalServerErrorException(
        MessagesAPI.CONTROLE.DESTROY.SERVER_ERROR,
      );
    }
  }
}
