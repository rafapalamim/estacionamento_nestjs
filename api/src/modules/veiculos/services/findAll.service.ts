import BaseService from 'src/modules/@base/services/service.base';
import { Injectable } from '@nestjs/common';
import { IFindAllService } from 'src/modules/@base/services/findAll.interface';
import { Constants } from 'src/utils/constants.helper';
import VeiculosEntity from '../veiculos.entity';
import { FindAllVeiculoInput, FindAllVeiculoOutput } from '../dto/findAll.dto';

@Injectable()
export default class VeiculoFindAllService
  extends BaseService<VeiculosEntity>
  implements IFindAllService<FindAllVeiculoInput, FindAllVeiculoOutput>
{
  async execute(query: FindAllVeiculoInput): Promise<FindAllVeiculoOutput> {
    const { pagina, ...params } = query;
    const paginaAtual = pagina || 0;
    const pular = paginaAtual * Constants.registrosPorPagina;

    const filtroWhere: FindAllVeiculoInput = {};
    if (typeof params.placa !== 'undefined') {
      filtroWhere['placa'] = params.placa;
    }

    if (typeof params.cor !== 'undefined') {
      filtroWhere['cor'] = params.cor;
    }

    if (typeof params.modelo !== 'undefined') {
      filtroWhere['modelo'] = params.modelo;
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
      data: result.map((veiculo: VeiculosEntity) => {
        return { ...veiculo };
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
