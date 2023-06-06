import { Constants } from 'src/utils/constants.helper';
import { DataSource } from 'typeorm';
import { VeiculoEntity } from './entities/veiculo.entity';

export const veiculoProviders = [
  {
    provide: Constants.veiculoRepositorio,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(VeiculoEntity),
    inject: [Constants.dataSource],
  },
];
