import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Constants } from 'src/utils/constants.helper';
import { Repository } from 'typeorm';
import { VeiculoEntity } from '../entities/veiculo.entity';
import { FindVeiculoOutputDto } from '../dto/find-veiculo.dto';

@Injectable()
export class VeiculoFindOneService {
  constructor(
    @Inject(Constants.veiculoRepositorio)
    private repository: Repository<VeiculoEntity>,
  ) {}
  async execute(id: number): Promise<FindVeiculoOutputDto> {
    const search = await this.repository.findOneBy({ id });

    if (!search) {
      throw new NotFoundException(`Veículo #${id} não encontrado`);
    }

    return search;
  }
}
