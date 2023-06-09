import { UsuariosEntity } from 'src/modules/usuarios/usuarios.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class UsuariosSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(UsuariosEntity);

    const data = {
      nome: 'Admin',
      email: 'admin@mail.com',
      senha: '$2a$10$LA58Q2pizQgPd52fvxBhw.DEr80gXdA1JrS5QtH1PuKRJ1js/SJ1C', // password
    };

    if (await repository.findOneBy({ email: data.email })) {
      return;
    }

    await repository.insert(data);
  }
}
