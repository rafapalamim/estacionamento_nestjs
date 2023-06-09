import { Injectable } from '@nestjs/common';
import BaseService from 'src/modules/@base/services/service.base';
import ControlesEntity from '../controles.entity';
import { IFindAllService } from 'src/modules/@base/services/findAll.interface';
import {
  FindAllControleInput,
  FindAllControleOutput,
} from '../dto/findAll.dto';
import { Constants } from 'src/utils/constants.helper';
import { IsNull, Not } from 'typeorm';

@Injectable()
export default class ControleFindAllService
  extends BaseService<ControlesEntity>
  implements IFindAllService<FindAllControleInput, FindAllControleOutput>
{
  async execute(query: FindAllControleInput): Promise<FindAllControleOutput> {
    const { pagina, ...params } = query;
    const paginaAtual = pagina || 0;
    const pular = paginaAtual * Constants.registrosPorPagina;

    const filtroWhere: FindAllControleInput = {};
    if (typeof params.em_aberto !== 'undefined') {
      filtroWhere['data_saida'] = params.em_aberto ? IsNull() : Not(IsNull());
    }

    if (typeof params.estabelecimento_id !== 'undefined') {
      filtroWhere['estabelecimento_id'] = params.estabelecimento_id;
    }

    if (typeof params.veiculo_id !== 'undefined') {
      filtroWhere['veiculo_id'] = params.veiculo_id;
    }

    if (typeof params.veiculo_tipo !== 'undefined') {
      filtroWhere['veiculo_tipo'] = params.veiculo_tipo;
    }

    const filtroDeletados = params.cancelados ?? false;

    const [result, total] = await this.repository.findAndCount({
      where: filtroWhere,
      withDeleted: filtroDeletados,
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
