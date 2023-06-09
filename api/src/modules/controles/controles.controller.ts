import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
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
import { JwtAuthGuard } from '../autenticacao/guards/jwt.guard';
import { ThrowableError } from '../@base/dto/create.errors.output';
import { NotFoundOutput } from '../@base/dto/notFound.output';
import { InternalErrorOutput } from '../@base/dto/internalError.output';
import { BadRequestOutput } from '../@base/dto/badRequest.output';
import { Unauthorized } from '../@base/dto/Unauthorized.output';

@ApiTags('controles')
@Controller('controles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiResponse({
  status: 401,
  description: 'Token JWT não informado',
  type: Unauthorized,
})
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
  @ApiResponse({
    status: 200,
    description: 'Registro de entrada encontrado',
    type: FindControleOutput,
  })
  @ApiResponse({
    status: 404,
    description: 'Entrada não encontrada',
    type: NotFoundOutput,
  })
  async find(@Param('id') id: number): Promise<FindControleOutput> {
    return await this.findService.execute(id);
  }

  @Get('entrada')
  @ApiResponse({
    status: 200,
    description:
      'Registros encontrados. Caso não encontre registro(s) de acordo com o filtro informado, o atributo data devolve um array vazio',
    type: FindAllControleOutput,
  })
  async findAll(
    @Query() query: FindAllControleInput,
  ): Promise<FindAllControleOutput> {
    return await this.findAllService.execute(query);
  }

  @Post('entrada')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 201,
    description: 'Entrada registrada',
  })
  @ApiResponse({
    status: 400,
    description: 'Corpo da requisição inválido',
    type: ThrowableError,
  })
  @ApiResponse({
    status: 500,
    description: 'Não foi possível incluir a entrada',
    type: InternalErrorOutput,
  })
  async create(@Body() data: CreateEntradaInput): Promise<CreateEntradaOutput> {
    return await this.createService.execute(data);
  }

  @Patch('saida/:id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Saída registrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Entrada não encontrada',
    type: NotFoundOutput,
  })
  @ApiResponse({
    status: 500,
    description: 'Não foi possível salvar a saída',
    type: InternalErrorOutput,
  })
  async update(@Param('id') id: number): Promise<void> {
    return await this.updateService.execute(id);
  }

  @Delete('entrada/:id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Entrada cancelada/removida',
  })
  @ApiResponse({
    status: 400,
    description: 'Saída já registrada',
    type: BadRequestOutput,
  })
  @ApiResponse({
    status: 404,
    description: 'Entrada não encontrada',
    type: NotFoundOutput,
  })
  @ApiResponse({
    status: 500,
    description: 'Não foi possível cancelar/remover a entrada',
    type: InternalErrorOutput,
  })
  async destroy(@Param('id') id: number): Promise<void> {
    return await this.destroyService.execute(id);
  }
}
