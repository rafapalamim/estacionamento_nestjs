import { UsuarioEntity } from 'src/modules/autenticacao/usuarios/usuarios.entity';
import ControlesEntity from 'src/modules/controles/controles.entity';
import EstabelecimentosEntity from 'src/modules/estabelecimentos/estabelecimentos.entity';
import VeiculosEntity from 'src/modules/veiculos/veiculos.entity';
import { DataSourceOptions } from 'typeorm';

export const sqliteConfig: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [
    EstabelecimentosEntity,
    VeiculosEntity,
    UsuarioEntity,
    ControlesEntity,
  ],
  dropSchema: true,
  synchronize: true,
  logging: false,
};
