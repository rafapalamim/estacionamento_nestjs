import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import BaseService from 'src/modules/@base/services/service.base';
import ControlesEntity from '../controles.entity';
import { IDestroyService } from 'src/modules/@base/services/destroy.interface';

@Injectable()
export default class ControleDestroyService
  extends BaseService<ControlesEntity>
  implements IDestroyService
{
  async execute(id: number): Promise<void> {
    const find = await this.repository.findOneBy({ id });

    if (!find) {
      throw new NotFoundException('');
    }

    const deleted = await this.repository.softDelete({ id });

    if (deleted.affected < 1) {
      throw new InternalServerErrorException('');
    }
  }
}
