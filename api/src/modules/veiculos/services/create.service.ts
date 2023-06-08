import { ICreateService } from 'src/modules/@base/services/create.interface';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import BaseService from 'src/modules/@base/services/service.base';
import VeiculosEntity from '../veiculos.entity';
import { CreateVeiculoInput, CreateVeiculoOutput } from '../dto/create.dto';
import { MessagesAPI } from 'src/utils/messages.helper';

@Injectable()
export default class VeiculoCreateService
  extends BaseService<VeiculosEntity>
  implements ICreateService<CreateVeiculoInput, CreateVeiculoOutput>
{
  async execute(data: CreateVeiculoInput): Promise<CreateVeiculoOutput> {
    const entity = this.repository.create(data);
    await this.repository.insert(entity);

    if (!entity.id)
      throw new InternalServerErrorException(
        MessagesAPI.VEICULO.CREATE.SERVER_ERROR,
      );

    return {
      id: entity.id,
    };
  }
}
