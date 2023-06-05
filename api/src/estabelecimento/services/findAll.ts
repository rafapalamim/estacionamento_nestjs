import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EstabelecimentoEntity } from '../entities/estabelecimento.entity';
import { Constants } from 'src/utils/constants.helper';
import {
  FindAllEstabelecimentoDto,
  FindAllEstabelecimentoOutputDto,
} from '../dto/find-all-estabelecimento.dto';

@Injectable()
export class EstabelecimentoFindAllService {
  constructor(
    @Inject(Constants.estabelecimentoRepositorio)
    private repository: Repository<EstabelecimentoEntity>,
  ) {}
  async execute(
    query: FindAllEstabelecimentoDto,
  ): Promise<FindAllEstabelecimentoOutputDto> {
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
      data: result.map((estabelecimento: EstabelecimentoEntity) => {
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
