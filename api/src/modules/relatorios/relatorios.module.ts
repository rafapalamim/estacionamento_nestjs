import { Module } from '@nestjs/common';
import { MySQLModule } from 'src/database/modules/mysql.module';
import { ControlesModule } from '../controles/controles.module';
import { relatoriosProviders } from './relatorios.providers';
import RelatoriosController from './relatorios.controller';

@Module({
  imports: [MySQLModule, ControlesModule],
  controllers: [RelatoriosController],
  providers: [...relatoriosProviders],
})
export default class RelatoriosModule {}
