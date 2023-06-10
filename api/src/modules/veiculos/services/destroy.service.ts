import { IDestroyService } from 'src/modules/@base/services/destroy.interface';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import VeiculosEntity from '../veiculos.entity';
import { MessagesAPI } from 'src/utils/messages.helper';
import { Constants } from 'src/utils/constants.helper';
import { Repository } from 'typeorm';

@Injectable()
export default class VeiculoDestroyService implements IDestroyService {
  constructor(
    @Inject(Constants.veiculoRepositorio)
    private repository: Repository<VeiculosEntity>,
  ) {}

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
