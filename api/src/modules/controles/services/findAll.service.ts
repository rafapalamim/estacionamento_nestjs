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

    const whereClause: FindAllControleInput = {};

    whereClause['data_saida'] = params.em_aberto ? IsNull() : Not(IsNull());
    whereClause['deleted_at'] = params.cancelados ? Not(IsNull()) : IsNull();

    if (params.estabelecimento_id)
      whereClause['estabelecimento_id'] = params.estabelecimento_id;

    if (params.veiculo_id) whereClause['veiculo_id'] = params.veiculo_id;

    if (params.veiculo_tipo) whereClause['veiculo_tipo'] = params.veiculo_tipo;

    console.log(whereClause);

    const [result, total] = await this.repository.findAndCount({
      where: whereClause,
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
