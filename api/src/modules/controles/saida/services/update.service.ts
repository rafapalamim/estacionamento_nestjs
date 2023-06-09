import { IUpdateService } from 'src/modules/@base/services/update.interface';
import BaseService from 'src/modules/@base/services/service.base';
import ControlesEntity from '../../controles.entity';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { MessagesAPI } from 'src/utils/messages.helper';

@Injectable()
export default class SaidaUpdateService
  extends BaseService<ControlesEntity>
  implements IUpdateService<number, void>
{
  async execute(id: number): Promise<void> {
    const entrada = await this.repository.findOneBy({ id });

    if (!entrada) {
      throw new NotFoundException(MessagesAPI.CONTROLE.UPDATE.NOT_FOUND);
    }

    if (entrada.data_saida != null) {
      throw new BadRequestException(MessagesAPI.CONTROLE.UPDATE.BAD_REQUEST);
    }

    const saida = await this.repository.update(id, { data_saida: new Date() });

    if (saida.affected < 1) {
      throw new InternalServerErrorException(
        MessagesAPI.CONTROLE.UPDATE.SERVER_ERROR,
      );
    }
  }
}
