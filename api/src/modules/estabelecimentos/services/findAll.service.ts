import EstabelecimentosEntity from '../estabelecimentos.entity';
import { Inject, Injectable } from '@nestjs/common';
import { IFindAllService } from 'src/modules/@base/services/findAll.interface';
import {
  FindAllEstabelecimentoInput,
  FindAllEstabelecimentoOutput,
} from '../dto/findAll.dto';
import { Constants } from 'src/utils/constants.helper';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export default class EstabelecimentoFindAllService
  implements
    IFindAllService<FindAllEstabelecimentoInput, FindAllEstabelecimentoOutput>
{
  constructor(
    @Inject(Constants.estabelecimentoRepositorio)
    private repository: Repository<EstabelecimentosEntity>,
  ) {}

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

    if (typeof params.ativo !== 'undefined') {
      const booleanConvert =
        Boolean(params.ativo) && typeof params.ativo == 'boolean'
          ? params.ativo
          : (params.ativo as unknown as string) == 'true';

      filtroWhere['deleted_at'] =
        booleanConvert == true ? IsNull() : Not(IsNull());
    }

    const [result, total] = await this.repository.findAndCount({
      where: filtroWhere,
      withDeleted: true,
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
