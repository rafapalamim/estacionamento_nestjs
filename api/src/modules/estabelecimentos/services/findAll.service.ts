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

    const filtroWhere: FindAllEstabelecimentoInput = {};
    if (typeof params.nome !== 'undefined') {
      filtroWhere['nome'] = params.nome;
    }

    if (typeof params.cnpj !== 'undefined') {
      filtroWhere['cnpj'] = params.cnpj;
    }

    if (typeof params.endereco !== 'undefined') {
      filtroWhere['endereco'] = params.endereco;
    }

    const filtroDeletados = params.ativo ?? false;

    const [result, total] = await this.repository.findAndCount({
      where: filtroWhere,
      withDeleted: filtroDeletados,
      order: { id: 'ASC' },
      take: Constants.registrosPorPagina,
      skip: pular,
    });

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
