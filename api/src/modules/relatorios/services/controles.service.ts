import { Inject, Injectable } from '@nestjs/common';
import ControlesEntity from 'src/modules/controles/controles.entity';
import { Constants } from 'src/utils/constants.helper';
import { Repository } from 'typeorm';
import { RelatorioInput } from '../dto/relatorio.dto';

@Injectable()
export default class RelatorioControlesService {
  constructor(
    @Inject(Constants.controleRepositorio)
    private repository: Repository<ControlesEntity>,
  ) {}

  async execute(search: RelatorioInput): Promise<any> {
    const { estabelecimento_id, data_inicio, data_fim } = search;
    const resultado = {
      em_aberto: {
        total: 0,
        data: [],
      },
      pesquisa: {
        total: 0,
        totalEmAberto: 0,
        totalSaidas: 0,
        data: [],
      },
    };

    const queryEmAberto = this.repository
      .createQueryBuilder('controles')
      .select('controles')
      .where('data_saida IS NULL');

    if (estabelecimento_id) {
      queryEmAberto.where('estabelecimento_id = :id', {
        id: estabelecimento_id,
      });
    }

    const emAberto = await queryEmAberto.getMany();
    resultado.em_aberto.total = emAberto.length;
    resultado.em_aberto.data = emAberto.map((controle: ControlesEntity) => {
      return {
        id: controle.id,
        entrada:
          new Date(controle.data_entrada).toLocaleDateString('pt-BR') +
          ` ${controle.data_entrada.toISOString().substring(11, 19)}`,
        veiculo: '',
        estabelecimento: '',
      };
    });

    const queryPesquisa = this.repository
      .createQueryBuilder('controles')
      .select('controles');

    if (estabelecimento_id) {
      queryPesquisa.where('estabelecimento_id = :id', {
        id: estabelecimento_id,
      });
    }

    if (data_inicio) {
      queryPesquisa.where('data_entrada between :inicio and :fim', {
        inicio: data_inicio,
        fim: data_fim,
      });
    }

    if (data_fim) {
      queryPesquisa.orWhere('data_saida between :inicio and :fim', {
        inicio: data_inicio,
        fim: data_fim,
      });
    }

    const pesquisa = await queryPesquisa.getMany();

    resultado.pesquisa.total = pesquisa.length;
    resultado.pesquisa.totalEmAberto = pesquisa.reduce(
      (soma: number, controle: ControlesEntity) => {
        return controle.data_saida === null ? soma + 1 : soma;
      },
      0,
    );
    resultado.pesquisa.totalSaidas = pesquisa.reduce(
      (soma: number, controle: ControlesEntity) => {
        return controle.data_saida !== null ? soma + 1 : soma;
      },
      0,
    );

    resultado.pesquisa.data = pesquisa.map((controle: ControlesEntity) => {
      return {
        id: controle.id,
        entrada:
          new Date(controle.data_entrada).toLocaleDateString('pt-BR') +
          ` ${controle.data_entrada.toISOString().substring(11, 19)}`,
        saida:
          controle.data_saida !== null
            ? new Date(controle.data_saida).toLocaleDateString('pt-BR') +
              ` ${controle.data_saida.toISOString().substring(11, 19)}`
            : null,
        veiculo: '',
        estabelecimento: '',
      };
    });

    return resultado;
  }
}
