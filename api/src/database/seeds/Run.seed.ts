import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager, runSeeder } from 'typeorm-extension';
import { UsuariosSeeder } from './Usuarios.seed';

export class RunSeeds implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeder(dataSource, UsuariosSeeder);
  }
}
