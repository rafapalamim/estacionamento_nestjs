import BaseService from 'src/modules/@base/services/service.base';
import { IDestroyService } from 'src/modules/@base/services/destroy.interface';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import VeiculosEntity from '../veiculos.entity';
import { MessagesAPI } from 'src/utils/messages.helper';

@Injectable()
export default class VeiculoDestroyService
  extends BaseService<VeiculosEntity>
  implements IDestroyService
{
  async execute(id: number): Promise<void> {
    const find = await this.repository.findOneBy({ id });

    if (!find) {
      throw new NotFoundException(MessagesAPI.VEICULO.DESTROY.NOT_FOUND);
    }

    const deleted = await this.repository.softDelete({ id });

    if (deleted.affected < 1) {
      throw new InternalServerErrorException(
        MessagesAPI.VEICULO.DESTROY.SERVER_ERROR,
      );
    }
  }
}
