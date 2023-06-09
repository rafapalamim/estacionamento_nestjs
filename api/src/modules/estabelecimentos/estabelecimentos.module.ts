import { Module } from '@nestjs/common';
import { EstabelecimentosController } from './estabelecimentos.controller';
import { MySQLModule } from 'src/database/modules/mysql.module';
import { estabelecimentosProviders } from './estabelecimentos.providers';
import EstabelecimentoFindService from './services/find.service';

@Module({
  imports: [MySQLModule],
  controllers: [EstabelecimentosController],
  providers: [...estabelecimentosProviders],
  exports: [EstabelecimentoFindService],
})
export class EstabelecimentosModule {}
