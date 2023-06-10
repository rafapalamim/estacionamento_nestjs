import { DataSource } from 'typeorm';
import VeiculosEntity from './veiculos.entity';
import VeiculoCreateService from './services/create.service';
import VeiculoUpdateService from './services/update.service';
import VeiculoDestroyService from './services/destroy.service';
import VeiculoFindService from './services/find.service';
import VeiculoFindAllService from './services/findAll.service';
import { Constants } from 'src/utils/constants.helper';

export const veiculosProviders = [
  {
    provide: Constants.veiculoRepositorio,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(VeiculosEntity),
    inject: ['DATA_SOURCE'],
  },
  VeiculoCreateService,
  VeiculoUpdateService,
  VeiculoDestroyService,
  VeiculoFindService,
  VeiculoFindAllService,
];
