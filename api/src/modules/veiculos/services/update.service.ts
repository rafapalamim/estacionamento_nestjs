import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IUpdateService } from 'src/modules/@base/services/update.interface';
import VeiculosEntity from '../veiculos.entity';
import { UpdateVeiculoInput, UpdateVeiculoOutput } from '../dto/update.dto';
import { MessagesAPI } from 'src/utils/messages.helper';
import { Constants } from 'src/utils/constants.helper';
import { Repository } from 'typeorm';

@Injectable()
export default class VeiculoUpdateService
  implements IUpdateService<UpdateVeiculoInput, UpdateVeiculoOutput>
{
  constructor(
    @Inject(Constants.veiculoRepositorio)
    private repository: Repository<VeiculosEntity>,
  ) {}

  async execute(data: UpdateVeiculoInput): Promise<UpdateVeiculoOutput> {
    const id = data.id || null;

    if (!id) {
      const entity = this.repository.create(data);
      await this.repository.insert(entity);

      if (!entity.id)
        throw new InternalServerErrorException(
          MessagesAPI.VEICULO.UPDATE.SERVER_ERROR,
        );

      return entity;
    }

    const find = await this.repository.findOneBy({ id: id });

    if (!find) {
      throw new NotFoundException(MessagesAPI.VEICULO.UPDATE.NOT_FOUND);
    }

    const newData = this.repository.merge(find, data);
    const updated = await this.repository.save(newData);

    if (!updated)
      throw new InternalServerErrorException(
        MessagesAPI.VEICULO.UPDATE.SERVER_ERROR,
      );

    return newData;
  }
}
