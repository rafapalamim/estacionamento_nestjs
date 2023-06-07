import BaseService from 'src/modules/@base/services/service.base';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IFindAllService } from 'src/modules/@base/services/findAll.interface';
import { Constants } from 'src/utils/constants.helper';
import VeiculosEntity from '../veiculos.entity';
import { FindAllVeiculoInput, FindAllVeiculoOutput } from '../dto/findAll.dto';
import { MessagesAPI } from 'src/utils/messages.helper';

@Injectable()
export default class VeiculoFindAllService
  extends BaseService<VeiculosEntity>
  implements IFindAllService<FindAllVeiculoInput, FindAllVeiculoOutput>
{
  async execute(query: FindAllVeiculoInput): Promise<FindAllVeiculoOutput> {
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
      throw new NotFoundException(MessagesAPI.VEICULO.FIND_ALL.NOT_FOUND);
    }

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
