import { Module } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { EstabelecimentoController } from './estabelecimento.controller';
import { MySQLModule } from 'src/database/modules/mysql.module';
import { estabelecimentoProviders } from './estabelecimento.providers';

@Module({
  imports: [MySQLModule],
  controllers: [EstabelecimentoController],
  providers: [...estabelecimentoProviders, EstabelecimentoService],
})
export class EstabelecimentoModule {}
