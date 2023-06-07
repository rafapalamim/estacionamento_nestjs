import { Module } from '@nestjs/common';
import { MySQLModule } from './database/modules/mysql.module';
import { EstabelecimentosModule } from './modules/estabelecimentos/estabelecimentos.module';
import { VeiculosModule } from './modules/veiculos/veiculos.module';

@Module({
  imports: [MySQLModule, EstabelecimentosModule, VeiculosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
