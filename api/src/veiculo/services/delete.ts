import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Constants } from 'src/utils/constants.helper';
import { Repository } from 'typeorm';
import { VeiculoEntity } from '../entities/veiculo.entity';

@Injectable()
export class VeiculoDeleteService {
  constructor(
    @Inject(Constants.veiculoRepositorio)
    private repository: Repository<VeiculoEntity>,
  ) {}
  async execute(id: number): Promise<void> {
    const search = await this.repository.countBy({ id });

    if (search.valueOf() < 1) {
      throw new BadRequestException(
        `Não foi possível deletar o veículo ${id}. O veículo não existe`,
      );
    }

    const deleted = await this.repository.delete({ id });

    if (deleted.affected < 1) {
      throw new InternalServerErrorException(
        'Não foi possível remover o veículo',
      );
    }
  }
}
