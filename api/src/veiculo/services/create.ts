import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Constants } from 'src/utils/constants.helper';
import { Repository } from 'typeorm';
import { VeiculoEntity } from '../entities/veiculo.entity';
import {
  CreateVeiculoDto,
  CreateVeiculoOutputDto,
} from '../dto/create-veiculo.dto';

@Injectable()
export class VeiculoCreateService {
  constructor(
    @Inject(Constants.veiculoRepositorio)
    private repository: Repository<VeiculoEntity>,
  ) {}
  async execute(data: CreateVeiculoDto): Promise<CreateVeiculoOutputDto> {
    const veiculo = await this.repository.save(data);

    if (!veiculo) {
      throw new InternalServerErrorException(
        'Não foi possível incluir o estabelecimento',
      );
    }

    return {
      id: veiculo.id,
    };
  }
}
