import { Controller, Get, Query, Render } from '@nestjs/common';
import RelatorioEstabelecimentosService from './services/estabelecimentos.service';
import RelatorioControlesService from './services/controles.service';
import { RelatorioInput } from './dto/relatorio.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('relatorio')
@ApiExcludeController()
export default class RelatoriosController {
  constructor(
    private estabelecimentosService: RelatorioEstabelecimentosService,
    private controlesService: RelatorioControlesService,
  ) {}

  @Get()
  @Render('relatorio')
  async relatorio(): Promise<any> {
    const listaEstabelecimentos = await this.estabelecimentosService.execute();
    return { estabelecimentos: listaEstabelecimentos };
  }

  @Get('dados')
  async dados(@Query() params: RelatorioInput): Promise<any> {
    const controles = await this.controlesService.execute(params);
    // console.log(controles);
    return { data: controles };
  }
}
