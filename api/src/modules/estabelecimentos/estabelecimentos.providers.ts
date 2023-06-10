import { DataSource } from 'typeorm';
import EstabelecimentosEntity from './estabelecimentos.entity';
import EstabelecimentoCreateService from './services/create.service';
import EstabelecimentoUpdateService from './services/update.service';
import EstabelecimentoFindService from './services/find.service';
import EstabelecimentoDestroyService from './services/destroy.service';
import EstabelecimentoFindAllService from './services/findAll.service';
import { Constants } from 'src/utils/constants.helper';

export const estabelecimentosProviders = [
  {
    provide: Constants.estabelecimentoRepositorio,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EstabelecimentosEntity),
    inject: ['DATA_SOURCE'],
  },
  EstabelecimentoCreateService,
  EstabelecimentoUpdateService,
  EstabelecimentoFindService,
  EstabelecimentoDestroyService,
  EstabelecimentoFindAllService,
];
