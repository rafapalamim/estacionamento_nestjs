import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { EstabelecimentoEntity } from '../entities/estabelecimento.entity';
import { Constants } from 'src/utils/constants.helper';

@Injectable()
export class EstabelecimentoDeleteService {
  constructor(
    @Inject(Constants.estabelecimentoRepositorio)
    private repository: Repository<EstabelecimentoEntity>,
  ) {}
  async execute(id: number): Promise<void> {
    const search = await this.repository.countBy({ id });

    if (search.valueOf() < 1) {
      throw new BadRequestException(
        `Não foi possível deletar o estabelecimento ${id}. O estabelecimento não existe`,
      );
    }

    const deleted = await this.repository.delete({ id });

    if (deleted.affected < 1) {
      throw new InternalServerErrorException(
        'Não foi possível remover o estabelecimento',
      );
    }
  }
}
