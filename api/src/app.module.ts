import { Module } from '@nestjs/common';
import { EstabelecimentoModule } from './estabelecimento/estabelecimento.module';
import { MySQLModule } from './database/modules/mysql.module';

@Module({
  imports: [MySQLModule, EstabelecimentoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
