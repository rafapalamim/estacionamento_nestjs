import { Module } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { VeiculoController } from './veiculo.controller';
import { MySQLModule } from 'src/database/modules/mysql.module';
import { VeiculoCreateService } from './services/create';
import { VeiculoDeleteService } from './services/delete';
import { VeiculoFindOneService } from './services/find';
import { VeiculoUpdateService } from './services/update';
import { VeiculoFindAllService } from './services/findAll';
import { veiculoProviders } from './veiculo.providers';

@Module({
  imports: [MySQLModule],
  controllers: [VeiculoController],
  providers: [
    ...veiculoProviders,
    VeiculoService,
    VeiculoCreateService,
    VeiculoUpdateService,
    VeiculoDeleteService,
    VeiculoFindAllService,
    VeiculoFindOneService,
  ],
})
export class VeiculoModule {}
