import { Module } from '@nestjs/common';
import { MySQLModule } from './database/modules/mysql.module';
import { EstabelecimentosModule } from './modules/estabelecimentos/estabelecimentos.module';
import { VeiculosModule } from './modules/veiculos/veiculos.module';
import { ControlesModule } from './modules/controles/controles.module';
import { AutenticacaoModule } from './modules/autenticacao/autenticacao.module';
import { ConfigModule } from '@nestjs/config';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
