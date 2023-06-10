import ControlesEntity from 'src/modules/controles/controles.entity';
import EstabelecimentosEntity from 'src/modules/estabelecimentos/estabelecimentos.entity';
import { UsuariosEntity } from 'src/modules/usuarios/usuarios.entity';
import VeiculosEntity from 'src/modules/veiculos/veiculos.entity';
import { DataSourceOptions } from 'typeorm';

export const sqliteConfig: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [
    EstabelecimentosEntity,
    VeiculosEntity,
    UsuariosEntity,
    ControlesEntity,
  ],
  dropSchema: true,
  synchronize: true,
  logging: false,
};
