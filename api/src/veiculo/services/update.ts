import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Constants } from 'src/utils/constants.helper';
import { Repository } from 'typeorm';
import { VeiculoEntity } from '../entities/veiculo.entity';
import {
  UpdateVeiculoDto,
  UpdateVeiculoOutputDto,
} from '../dto/update-veiculo.dto';

@Injectable()
export class VeiculoUpdateService {
  constructor(
    @Inject(Constants.veiculoRepositorio)
    private repository: Repository<VeiculoEntity>,
  ) {}

  async execute(
    id: number,
    data: UpdateVeiculoDto,
  ): Promise<UpdateVeiculoOutputDto> {
    const search = await this.repository.findOneBy({ id });

    if (!search) {
      throw new NotFoundException('Estabelecimento não encontrado');
    }

    const newData = { ...search, ...data };

    const update = await this.repository.update(id, newData);

    if (update.affected < 1) {
      throw new InternalServerErrorException(
        'Não foi possível atualizar os dados do estabelecimento',
      );
    }

    return {
      id: newData.id,
      marca: newData.marca,
      modelo: newData.modelo,
      cor: newData.cor,
      placa: newData.placa,
      tipo: newData.tipo,
    };
  }
}
