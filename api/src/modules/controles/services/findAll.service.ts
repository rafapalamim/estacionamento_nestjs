import { Inject, Injectable } from '@nestjs/common';
import ControlesEntity from '../controles.entity';
import { IFindAllService } from 'src/modules/@base/services/findAll.interface';
import {
  FindAllControleInput,
  FindAllControleOutput,
} from '../dto/findAll.dto';
import { Constants } from 'src/utils/constants.helper';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export default class ControleFindAllService
  implements IFindAllService<FindAllControleInput, FindAllControleOutput>
{
  constructor(
    @Inject(Constants.controleRepositorio)
    private repository: Repository<ControlesEntity>,
  ) {}

  async execute(query: FindAllControleInput): Promise<FindAllControleOutput> {
    const { pagina, ...params } = query;
    const paginaAtual = pagina || 0;
    const pular = paginaAtual * Constants.registrosPorPagina;

    const filtroWhere: FindAllControleInput = {};

    if (typeof params.estabelecimento_id !== 'undefined') {
      filtroWhere['estabelecimento_id'] = parseInt(
        params.estabelecimento_id as unknown as string,
      );
    }

    if (typeof params.veiculo_id !== 'undefined') {
      filtroWhere['veiculo_id'] = parseInt(
        params.veiculo_id as unknown as string,
      );
    }

    if (typeof params.veiculo_tipo !== 'undefined') {
      filtroWhere['veiculo_tipo'] = params.veiculo_tipo;
    }

    if (typeof params.cancelados !== 'undefined') {
      const booleanConvert =
        Boolean(params.cancelados) && typeof params.cancelados == 'boolean'
          ? params.cancelados
          : (params.cancelados as unknown as string) == 'true';

      filtroWhere['deleted_at'] =
        booleanConvert == true ? Not(IsNull()) : IsNull();
    }

    if (typeof params.em_aberto !== 'undefined') {
      const booleanConvert =
        Boolean(params.em_aberto) && typeof params.em_aberto == 'boolean'
          ? params.em_aberto
          : (params.em_aberto as unknown as string) == 'true';

      if (booleanConvert == true) {
        filtroWhere['data_saida'] = IsNull();
        filtroWhere['deleted_at'] = IsNull();
      } else {
        filtroWhere['data_saida'] = Not(IsNull());
      }
    }

    const [result, total] = await this.repository.findAndCount({
      where: filtroWhere,
      withDeleted: true,
      order: { id: 'ASC' },
      take: Constants.registrosPorPagina,
      skip: pular,
    });

    return {
      data: result.map((controle: ControlesEntity) => {
        return { ...controle };
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
