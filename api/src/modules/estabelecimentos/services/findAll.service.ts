import BaseService from 'src/modules/@base/services/service.base';
import EstabelecimentosEntity from '../estabelecimentos.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IFindAllService } from 'src/modules/@base/services/findAll.interface';
import {
  FindAllEstabelecimentoInput,
  FindAllEstabelecimentoOutput,
} from '../dto/findAll.dto';
import { Constants } from 'src/utils/constants.helper';
import { MessagesAPI } from 'src/utils/messages.helper';

@Injectable()
export default class EstabelecimentoFindAllService
  extends BaseService<EstabelecimentosEntity>
  implements
    IFindAllService<FindAllEstabelecimentoInput, FindAllEstabelecimentoOutput>
{
  async execute(
    query: FindAllEstabelecimentoInput,
  ): Promise<FindAllEstabelecimentoOutput> {
    const { pagina, ...params } = query;
    const paginaAtual = pagina || 0;
    const pular = paginaAtual * Constants.registrosPorPagina;

    const [result, total] = await this.repository.findAndCount({
      where: { ...params },
      order: { id: 'ASC' },
      take: Constants.registrosPorPagina,
      skip: pular,
    });

    if (result.length < 1) {
      throw new NotFoundException(
        MessagesAPI.ESTABELECIMENTO.FIND_ALL.NOT_FOUND,
      );
    }

    return {
      data: result.map((estabelecimento: EstabelecimentosEntity) => {
        return { ...estabelecimento };
      }),
      pagination: {
        total: total,
        paginaAtual: paginaAtual,
        ultimaPagina:
          total > Constants.registrosPorPagina
            ? Math.ceil(total / Constants.registrosPorPagina)
            : 0,
      },
    };
  }
}
