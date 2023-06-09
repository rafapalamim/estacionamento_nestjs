import { Module } from '@nestjs/common';
import { MySQLModule } from './database/modules/mysql.module';
import { EstabelecimentosModule } from './modules/estabelecimentos/estabelecimentos.module';
import { VeiculosModule } from './modules/veiculos/veiculos.module';
import { ControlesModule } from './modules/controles/controles.module';
import { AutenticacaoModule } from './modules/autenticacao/autenticacao.module';

@Module({
  imports: [
    MySQLModule,
    AutenticacaoModule,
    EstabelecimentosModule,
    VeiculosModule,
    ControlesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
