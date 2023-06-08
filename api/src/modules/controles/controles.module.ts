import { Module } from '@nestjs/common';
import { MySQLModule } from 'src/database/modules/mysql.module';
import { controlesProviders } from './controles.providers';
import { VeiculosModule } from '../veiculos/veiculos.module';
import { EstabelecimentosModule } from '../estabelecimentos/estabelecimentos.module';
import { ControlesController } from './controles.controller';

@Module({
  imports: [MySQLModule, VeiculosModule, EstabelecimentosModule],
  controllers: [ControlesController],
  providers: [...controlesProviders],
})
export class ControlesModule {}
