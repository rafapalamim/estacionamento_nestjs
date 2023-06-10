import { ICreateService } from 'src/modules/@base/services/create.interface';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import VeiculosEntity from '../veiculos.entity';
import { CreateVeiculoInput, CreateVeiculoOutput } from '../dto/create.dto';
import { MessagesAPI } from 'src/utils/messages.helper';
import { QueryFailedError, Repository } from 'typeorm';
import { Constants } from 'src/utils/constants.helper';

@Injectable()
export default class VeiculoCreateService
  implements ICreateService<CreateVeiculoInput, CreateVeiculoOutput>
{
  constructor(
    @Inject(Constants.veiculoRepositorio)
    private repository: Repository<VeiculosEntity>,
  ) {}

  async execute(data: CreateVeiculoInput): Promise<CreateVeiculoOutput> {
    const entity = this.repository.create(data);
    await this.repository.insert(entity).catch((err: QueryFailedError) => {
      if (err.message.includes('Duplicate')) {
        throw new BadRequestException(`Placa ${data.placa} já existe`);
      }
      throw new InternalServerErrorException(
        MessagesAPI.VEICULO.CREATE.SERVER_ERROR,
      );
    });

    if (!entity.id)
      throw new InternalServerErrorException(
        MessagesAPI.VEICULO.CREATE.SERVER_ERROR,
      );

    return {
      id: entity.id,
    };
  }
}
