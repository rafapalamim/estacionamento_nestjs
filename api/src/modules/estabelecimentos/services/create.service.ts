import { ICreateService } from 'src/modules/@base/services/create.interface';
import {
  CreateEstabelecimentoInput,
  CreateEstabelecimentoOutput,
} from '../dto/create.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import BaseService from 'src/modules/@base/services/service.base';
import EstabelecimentosEntity from '../estabelecimentos.entity';
import { MessagesAPI } from 'src/utils/messages.helper';

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
        MessagesAPI.ESTABELECIMENTO.CREATE.SERVER_ERROR,
      );

    return {
      id: entity.id,
    };
  }
}
