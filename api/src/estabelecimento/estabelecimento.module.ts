import { Module } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { EstabelecimentoController } from './estabelecimento.controller';
import { MySQLModule } from 'src/database/modules/mysql.module';
import { estabelecimentoProviders } from './estabelecimento.providers';
import { EstabelecimentoCreateService } from './services/create';
import { EstabelecimentoUpdateService } from './services/update';
import { EstabelecimentoDeleteService } from './services/delete';
import { EstabelecimentoFindAllService } from './services/findAll';
import { EstabelecimentoFindOneService } from './services/find';

@Module({
  imports: [MySQLModule],
  controllers: [EstabelecimentoController],
  providers: [
    ...estabelecimentoProviders,
    EstabelecimentoService,
    EstabelecimentoCreateService,
    EstabelecimentoUpdateService,
    EstabelecimentoDeleteService,
    EstabelecimentoFindAllService,
    EstabelecimentoFindOneService,
  ],
})
export class EstabelecimentoModule {}
