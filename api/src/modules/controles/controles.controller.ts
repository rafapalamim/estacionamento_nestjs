import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import EntradaCreateService from './entrada/services/create.service';
import SaidaUpdateService from './saida/services/update.service';
import ControleFindService from './services/find.service';
import ControleFindAllService from './services/findAll.service';
import ControleDestroyService from './services/destroy.service';
import { FindControleOutput } from './dto/find.dto';
import { FindAllControleInput, FindAllControleOutput } from './dto/findAll.dto';
import {
  CreateEntradaInput,
  CreateEntradaOutput,
} from './entrada/dto/create.dto';

@ApiTags('controles')
@Controller('api/v1/controles')
export class ControlesController {
  constructor(
    @Inject(EntradaCreateService)
    private readonly createService: EntradaCreateService,
    @Inject(SaidaUpdateService)
    private readonly updateService: SaidaUpdateService,
    @Inject(ControleFindService)
    private readonly findService: ControleFindService,
    @Inject(ControleFindAllService)
    private readonly findAllService: ControleFindAllService,
    @Inject(ControleDestroyService)
    private readonly destroyService: ControleDestroyService,
  ) {}

  @Get('entrada/:id')
  async find(@Param('id') id: number): Promise<FindControleOutput> {
    return await this.findService.execute(id);
  }

  @Get('entrada')
  async findAll(
    @Query() query: FindAllControleInput,
  ): Promise<FindAllControleOutput> {
    return await this.findAllService.execute(query);
  }

  @Post('entrada')
  async create(@Body() data: CreateEntradaInput): Promise<CreateEntradaOutput> {
    return await this.createService.execute(data);
  }

  @Put('saida/:id')
  async update(@Param('id') id: number): Promise<void> {
    return await this.updateService.execute(id);
  }

  @Delete('entrada/:id')
  @HttpCode(204)
  async destroy(@Param('id') id: number): Promise<void> {
    return await this.destroyService.execute(id);
  }
}
