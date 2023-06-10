import EstabelecimentosEntity from '../estabelecimentos.entity';
import { IDestroyService } from 'src/modules/@base/services/destroy.interface';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { MessagesAPI } from 'src/utils/messages.helper';
import { Constants } from 'src/utils/constants.helper';
import { Repository } from 'typeorm';

@Injectable()
export default class EstabelecimentoDestroyService implements IDestroyService {
  constructor(
    @Inject(Constants.estabelecimentoRepositorio)
    private repository: Repository<EstabelecimentosEntity>,
  ) {}

  async execute(id: number): Promise<void> {
    const find = await this.repository.findOneBy({ id });

    if (!find) {
      throw new NotFoundException(
        MessagesAPI.ESTABELECIMENTO.DESTROY.NOT_FOUND,
      );
    }

    const deleted = await this.repository.softDelete({ id });

    if (deleted.affected < 1) {
      throw new InternalServerErrorException(
        MessagesAPI.ESTABELECIMENTO.DESTROY.SERVER_ERROR,
      );
    }
  }
}
