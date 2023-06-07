import { Module } from '@nestjs/common';
import { EstabelecimentosController } from './estabelecimentos.controller';
import { MySQLModule } from 'src/database/modules/mysql.module';
import { estabelecimentosProviders } from './estabelecimentos.providers';

@Module({
  imports: [MySQLModule],
  controllers: [EstabelecimentosController],
  providers: [...estabelecimentosProviders],
})
export class EstabelecimentosModule {}
