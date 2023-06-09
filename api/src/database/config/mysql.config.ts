import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { RunSeeds } from '../seeds/Run.seed';
import EstabelecimentosEntity from 'src/modules/estabelecimentos/estabelecimentos.entity';
import VeiculosEntity from 'src/modules/veiculos/veiculos.entity';
import { UsuarioEntity } from 'src/modules/autenticacao/usuarios/usuarios.entity';

export const mysqlConfig: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'parking',
  password: 'password',
  database: 'parking',
  entities: [EstabelecimentosEntity, VeiculosEntity, UsuarioEntity],
  migrations: [__dirname + '/../migrations/*_migration{.ts,.js}'],
  seeds: [RunSeeds],
  synchronize: false,
};
