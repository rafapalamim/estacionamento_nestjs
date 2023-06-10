import { DataSource } from 'typeorm';
import ControlesEntity from './controles.entity';
import EntradaCreateService from './entrada/services/create.service';
import SaidaUpdateService from './saida/services/update.service';
import ControleFindService from './services/find.service';
import ControleFindAllService from './services/findAll.service';
import EstabelecimentoFindService from '../estabelecimentos/services/find.service';
import VeiculoCreateService from '../veiculos/services/create.service';
import VeiculoFindAllService from '../veiculos/services/findAll.service';
import ControleDestroyService from './services/destroy.service';
import { Constants } from 'src/utils/constants.helper';
import VeiculosEntity from '../veiculos/veiculos.entity';
import EstabelecimentosEntity from '../estabelecimentos/estabelecimentos.entity';

export const controlesProviders = [
  {
    provide: Constants.controleRepositorio,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ControlesEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: Constants.veiculoRepositorio,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(VeiculosEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: Constants.estabelecimentoRepositorio,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EstabelecimentosEntity),
    inject: ['DATA_SOURCE'],
  },
  ControleFindAllService,
  ControleFindService,
  ControleDestroyService,
  EntradaCreateService,
  SaidaUpdateService,
  EstabelecimentoFindService,
  VeiculoCreateService,
  VeiculoFindAllService,
];
