import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import BaseService from 'src/modules/@base/services/service.base';
import { IUpdateService } from 'src/modules/@base/services/update.interface';
import VeiculosEntity from '../veiculos.entity';
import { UpdateVeiculoInput, UpdateVeiculoOutput } from '../dto/update.dto';
import { MessagesAPI } from 'src/utils/messages.helper';

@Injectable()
export default class VeiculoUpdateService
  extends BaseService<VeiculosEntity>
  implements IUpdateService<UpdateVeiculoInput, UpdateVeiculoOutput>
{
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
