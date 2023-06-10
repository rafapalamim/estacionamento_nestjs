import { Module } from '@nestjs/common';
import { VeiculosController } from './veiculos.controller';
import { MySQLModule } from 'src/database/modules/mysql.module';
import { veiculosProviders } from './veiculos.providers';
import VeiculoCreateService from './services/create.service';
import VeiculoFindAllService from './services/findAll.service';

@Module({
  imports: [MySQLModule],
  controllers: [VeiculosController],
  providers: [...veiculosProviders],
  exports: [VeiculoCreateService, VeiculoFindAllService],
})
export class VeiculosModule {}
