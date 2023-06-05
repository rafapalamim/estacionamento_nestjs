import { DataSource } from 'typeorm';
import { EstabelecimentoEntity } from './entities/estabelecimento.entity';
import { Constants } from 'src/utils/constants.helper';

export const estabelecimentoProviders = [
  {
    provide: Constants.estabelecimentoRepositorio,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EstabelecimentoEntity),
    inject: [Constants.dataSource],
  },
];
