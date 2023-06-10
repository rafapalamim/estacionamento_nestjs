import { ICreateService } from 'src/modules/@base/services/create.interface';
import {
  CreateEstabelecimentoInput,
  CreateEstabelecimentoOutput,
} from '../dto/create.dto';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import EstabelecimentosEntity from '../estabelecimentos.entity';
import { MessagesAPI } from 'src/utils/messages.helper';
import { Constants } from 'src/utils/constants.helper';
import { Repository } from 'typeorm';

@Injectable()
export default class EstabelecimentoCreateService
  implements
    ICreateService<CreateEstabelecimentoInput, CreateEstabelecimentoOutput>
{
  constructor(
    @Inject(Constants.estabelecimentoRepositorio)
    private repository: Repository<EstabelecimentosEntity>,
  ) {}

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
