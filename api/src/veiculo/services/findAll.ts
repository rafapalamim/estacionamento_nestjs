import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Constants } from 'src/utils/constants.helper';
import { Repository } from 'typeorm';
import { VeiculoEntity } from '../entities/veiculo.entity';
import {
  FindAllVeiculosDto,
  FindAllVeiculosOutputDto,
} from '../dto/find-all-veiculos.dto';

@Injectable()
export class VeiculoFindAllService {
  constructor(
    @Inject(Constants.veiculoRepositorio)
    private repository: Repository<VeiculoEntity>,
  ) {}
  async execute(query: FindAllVeiculosDto): Promise<FindAllVeiculosOutputDto> {
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
      throw new NotFoundException('Nenhum estabelecimento encontrado');
    }

    return {
      data: result.map((estabelecimento: VeiculoEntity) => {
        return { ...estabelecimento };
      }),
      paginacao: {
        totalDeRegistros: total,
        paginaAtual: paginaAtual,
        ultimaPagina:
          total > Constants.registrosPorPagina
            ? Math.ceil(total / Constants.registrosPorPagina)
            : 0,
      },
    };
  }
}
