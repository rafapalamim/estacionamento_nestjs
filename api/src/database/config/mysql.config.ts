import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { RunSeeds } from '../seeds/Run.seed';
import EstabelecimentosEntity from 'src/modules/estabelecimentos/estabelecimentos.entity';
import VeiculosEntity from 'src/modules/veiculos/veiculos.entity';
import ControlesEntity from 'src/modules/controles/controles.entity';
import { UsuariosEntity } from 'src/modules/usuarios/usuarios.entity';

export const mysqlConfig: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'parking',
  password: 'password',
  database: 'parking',
  entities: [
    EstabelecimentosEntity,
    VeiculosEntity,
    UsuariosEntity,
    ControlesEntity,
  ],
  migrations: [__dirname + '/../migrations/*_migration{.ts,.js}'],
  seeds: [RunSeeds],
  synchronize: false,
};
