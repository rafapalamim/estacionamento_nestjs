import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import BaseService from 'src/modules/@base/services/service.base';
import {
  UpdateEstabelecimentoInput,
  UpdateEstabelecimentoOutput,
} from '../dto/update.dto';
import { IUpdateService } from 'src/modules/@base/services/update.interface';
import EstabelecimentosEntity from '../estabelecimentos.entity';
import { MessagesAPI } from 'src/utils/messages.helper';

@Injectable()
export default class EstabelecimentoUpdateService
  extends BaseService<EstabelecimentosEntity>
  implements
    IUpdateService<UpdateEstabelecimentoInput, UpdateEstabelecimentoOutput>
{
  async execute(
    data: UpdateEstabelecimentoInput,
  ): Promise<UpdateEstabelecimentoOutput> {
    const id = data.id || null;

    if (!id) {
      const entity = this.repository.create(data);
      await this.repository.insert(entity);

      if (!entity.id)
        throw new InternalServerErrorException(
          MessagesAPI.ESTABELECIMENTO.UPDATE.SERVER_ERROR,
        );

      return entity;
    }

    const find = await this.repository.findOneBy({ id: id });

    if (!find) {
      throw new NotFoundException(MessagesAPI.ESTABELECIMENTO.UPDATE.NOT_FOUND);
    }

    const newData = this.repository.merge(find, data);
    const updated = await this.repository.save(newData);

    if (!updated)
      throw new InternalServerErrorException(
        MessagesAPI.ESTABELECIMENTO.UPDATE.SERVER_ERROR,
      );

    return newData;
  }
}
