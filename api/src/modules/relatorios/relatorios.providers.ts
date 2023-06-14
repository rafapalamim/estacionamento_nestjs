import { Constants } from 'src/utils/constants.helper';
import { DataSource } from 'typeorm';
import ControlesEntity from '../controles/controles.entity';
import EstabelecimentosEntity from '../estabelecimentos/estabelecimentos.entity';
import RelatorioEstabelecimentosService from './services/estabelecimentos.service';
import RelatorioControlesService from './services/controles.service';

export const relatoriosProviders = [
  {
    provide: Constants.controleRepositorio,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ControlesEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: Constants.estabelecimentoRepositorio,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EstabelecimentosEntity),
    inject: ['DATA_SOURCE'],
  },
  RelatorioEstabelecimentosService,
  RelatorioControlesService,
];
