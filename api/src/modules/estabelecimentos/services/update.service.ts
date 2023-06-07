import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import BaseService from 'src/modules/@base/services/service.base';
import {
  UpdateEstabelecimentoInput,
  UpdateEstabelecimentoOutput,
} from '../dto/update.dto';
import { IUpdateService } from 'src/modules/@base/services/update.interface';
import EstabelecimentosEntity from '../estabelecimentos.entity';

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
          'Não foi possível inserir o registro',
        );

      return entity;
    }

    const find = await this.repository.findOneBy({ id: id });

    if (!find) {
      throw new BadRequestException(
        'Não foi possível incluir/atualizar o recurso. Estabelecimento não encontrado',
      );
    }

    const newData = this.repository.merge(find, data);
    const updated = await this.repository.save(newData);

    if (!updated)
      throw new InternalServerErrorException(
        'Não foi possível atualizar o registro',
      );

    return newData;
  }
}
