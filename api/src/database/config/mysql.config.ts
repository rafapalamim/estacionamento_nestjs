import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { RunSeeds } from '../seeds/Run.seed';
import EstabelecimentosEntity from 'src/modules/estabelecimentos/estabelecimentos.entity';
import VeiculosEntity from 'src/modules/veiculos/veiculos.entity';
import ControlesEntity from 'src/modules/controles/controles.entity';
import { UsuariosEntity } from 'src/modules/usuarios/usuarios.entity';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

export const mysqlConfig: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT as unknown as number,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
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
