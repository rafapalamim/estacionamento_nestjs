import { Module } from '@nestjs/common';
import { EstabelecimentoModule } from './estabelecimento/estabelecimento.module';
import { MySQLModule } from './database/modules/mysql.module';
import { VeiculoModule } from './veiculo/veiculo.module';

@Module({
  imports: [MySQLModule, EstabelecimentoModule, VeiculoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
