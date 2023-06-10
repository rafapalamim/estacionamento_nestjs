import { IUpdateService } from 'src/modules/@base/services/update.interface';
import ControlesEntity from '../../controles.entity';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { MessagesAPI } from 'src/utils/messages.helper';
import { Constants } from 'src/utils/constants.helper';
import { Repository } from 'typeorm';

@Injectable()
export default class SaidaUpdateService
  implements IUpdateService<number, void>
{
  constructor(
    @Inject(Constants.controleRepositorio)
    private repository: Repository<ControlesEntity>,
  ) {}

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
