import { Module } from '@nestjs/common';
import { MySQLModule } from './database/modules/mysql.module';
import { EstabelecimentosModule } from './modules/estabelecimentos/estabelecimentos.module';
import { VeiculosModule } from './modules/veiculos/veiculos.module';
import { ControlesModule } from './modules/controles/controles.module';
import { AutenticacaoModule } from './modules/autenticacao/autenticacao.module';
import { ConfigModule } from '@nestjs/config';
import RelatoriosModule from './modules/relatorios/relatorios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MySQLModule,
    AutenticacaoModule,
    EstabelecimentosModule,
    VeiculosModule,
    ControlesModule,
    RelatoriosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
