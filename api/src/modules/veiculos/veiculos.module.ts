import { Module } from '@nestjs/common';
import { VeiculosController } from './veiculos.controller';
import { MySQLModule } from 'src/database/modules/mysql.module';
import { veiculosProviders } from './veiculos.providers';

@Module({
  imports: [MySQLModule],
  controllers: [VeiculosController],
  providers: [...veiculosProviders],
})
export class VeiculosModule {}
