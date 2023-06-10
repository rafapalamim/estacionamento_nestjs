import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { DataSource } from 'typeorm';
import { UsuariosEntity } from './usuarios.entity';
import { MySQLModule } from 'src/database/modules/mysql.module';

@Module({
  imports: [MySQLModule],
  providers: [
    {
      provide: 'REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(UsuariosEntity),
      inject: ['DATA_SOURCE'],
    },
    UsuariosService,
  ],
  exports: [UsuariosService],
})
export class UsuariosModule {}
