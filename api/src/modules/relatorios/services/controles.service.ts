import { Inject, Injectable } from '@nestjs/common';
import ControlesEntity from 'src/modules/controles/controles.entity';
import { Constants } from 'src/utils/constants.helper';
import { Repository } from 'typeorm';
import { RelatorioInput } from '../dto/relatorio.dto';
import EstabelecimentosEntity from 'src/modules/estabelecimentos/estabelecimentos.entity';
import VeiculosEntity from 'src/modules/veiculos/veiculos.entity';

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
      .select([
        'controles',
        'estabelecimentos.nome',
        'estabelecimentos.id',
        'veiculos.modelo',
        'veiculos.id',
        'veiculos.placa',
      ])
      .innerJoin(
        EstabelecimentosEntity,
        'estabelecimentos',
        'controles.estabelecimento_id = estabelecimentos.id',
      )
      .innerJoin(
        VeiculosEntity,
        'veiculos',
        'controles.veiculo_id = veiculos.id',
      )
      .where('data_saida IS NULL');

    if (estabelecimento_id) {
      queryEmAberto.andWhere('controles.estabelecimento_id = :id', {
        id: estabelecimento_id,
      });
    }

    const emAberto = await queryEmAberto.getRawMany();
    resultado.em_aberto.total = emAberto.length;
    resultado.em_aberto.data = emAberto.map((controle) => {
      return {
        id: controle.id,
        entrada:
          new Date(controle.controles_data_entrada).toLocaleDateString(
            'pt-BR',
          ) +
          ` ${controle.controles_data_entrada.toISOString().substring(11, 19)}`,
        veiculo: {
          id: controle.veiculos_id,
          modelo: controle.veiculos_modelo,
          placa: controle.veiculos_placa,
        },
        estabelecimento: {
          id: controle.estabelecimentos_id,
          nome: controle.estabelecimentos_nome,
        },
      };
    });

    const queryPesquisa = this.repository
      .createQueryBuilder('controles')
      .select([
        'controles',
        'estabelecimentos.nome',
        'estabelecimentos.id',
        'veiculos.modelo',
        'veiculos.id',
        'veiculos.placa',
      ])
      .innerJoin(
        EstabelecimentosEntity,
        'estabelecimentos',
        'controles.estabelecimento_id = estabelecimentos.id',
      )
      .innerJoin(
        VeiculosEntity,
        'veiculos',
        'controles.veiculo_id = veiculos.id',
      );

    if (estabelecimento_id) {
      queryPesquisa.where('controles.estabelecimento_id = :id', {
        id: estabelecimento_id,
      });
    }

    if (data_inicio && data_fim) {
      queryPesquisa.andWhere(
        '(controles.data_entrada between :inicio and :fim OR controles.data_saida between :inicio and :fim)',
        {
          inicio: data_inicio,
          fim: data_fim,
        },
      );
    }

    const pesquisa = await queryPesquisa.getRawMany();
    resultado.pesquisa.total = pesquisa.length;
    resultado.pesquisa.totalEmAberto = pesquisa.reduce(
      (soma: number, controle) => {
        return controle.controles_data_saida === null ? soma + 1 : soma;
      },
      0,
    );
    resultado.pesquisa.totalSaidas = pesquisa.reduce(
      (soma: number, controle) => {
        return controle.controles_data_saida !== null ? soma + 1 : soma;
      },
      0,
    );

    resultado.pesquisa.data = pesquisa.map((controle) => {
      return {
        id: controle.id,
        entrada:
          new Date(controle.controles_data_entrada).toLocaleDateString(
            'pt-BR',
          ) +
          ` ${controle.controles_data_entrada.toISOString().substring(11, 19)}`,
        saida:
          controle.controles_data_saida !== null
            ? new Date(controle.controles_data_saida).toLocaleDateString(
                'pt-BR',
              ) +
              ` ${controle.controles_data_saida
                .toISOString()
                .substring(11, 19)}`
            : null,
        veiculo: {
          id: controle.veiculos_id,
          modelo: controle.veiculos_modelo,
          placa: controle.veiculos_placa,
        },
        estabelecimento: {
          id: controle.estabelecimentos_id,
          nome: controle.estabelecimentos_nome,
        },
      };
    });

    return resultado;
  }
}
