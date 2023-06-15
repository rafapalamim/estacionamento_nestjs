import { Inject, Injectable } from '@nestjs/common';
import { Constants } from 'src/utils/constants.helper';
import { Repository } from 'typeorm';
import EstabelecimentosEntity from 'src/modules/estabelecimentos/estabelecimentos.entity';
import { RelatorioEstabelecimentosOutput } from '../dto/relatorio.dto';

@Injectable()
export default class RelatorioEstabelecimentosService {
  constructor(
    @Inject(Constants.estabelecimentoRepositorio)
    private estabelecimentoRepo: Repository<EstabelecimentosEntity>,
  ) {}

  async execute(): Promise<RelatorioEstabelecimentosOutput[]> {
    const estabelecimentos = await this.estabelecimentoRepo.find({
      order: {
        nome: 'ASC',
        deleted_at: 'ASC',
      },
      withDeleted: true,
    });

    return estabelecimentos.map((estabelecimento: EstabelecimentosEntity) => {
      return {
        id: estabelecimento.id,
        nome: estabelecimento.nome,
        endereco: estabelecimento.endereco,
        desativado: estabelecimento.deleted_at !== null,
      };
    });
  }
}
