import { ICreateService } from 'src/modules/@base/services/create.interface';
import {
  CreateEstabelecimentoInput,
  CreateEstabelecimentoOutput,
} from '../dto/create.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import BaseService from 'src/modules/@base/services/service.base';
import EstabelecimentosEntity from '../estabelecimentos.entity';

@Injectable()
export default class EstabelecimentoCreateService
  extends BaseService<EstabelecimentosEntity>
  implements
    ICreateService<CreateEstabelecimentoInput, CreateEstabelecimentoOutput>
{
  async execute(
    data: CreateEstabelecimentoInput,
  ): Promise<CreateEstabelecimentoOutput> {
    const entity = this.repository.create(data);
    await this.repository.insert(entity);

    if (!entity.id)
      throw new InternalServerErrorException(
        'Não foi possível criar o estabelecimento',
      );

    return {
      id: entity.id,
    };
  }
}
