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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import VeiculoCreateService from './services/create.service';
import VeiculoUpdateService from './services/update.service';
import VeiculoFindService from './services/find.service';
import VeiculoFindAllService from './services/findAll.service';
import VeiculoDestroyService from './services/destroy.service';
import { ThrowableError } from '../@base/dto/create.errors.output';
import { CreateVeiculoInput, CreateVeiculoOutput } from './dto/create.dto';
import { UpdateVeiculoInput, UpdateVeiculoOutput } from './dto/update.dto';
import { FindAllVeiculoInput, FindAllVeiculoOutput } from './dto/findAll.dto';
import { FindVeiculoOutput } from './dto/find.dto';
import { JwtAuthGuard } from '../autenticacao/guards/jwt.guard';
import { NotFoundOutput } from '../@base/dto/notFound.output';

@ApiTags('veiculos')
@Controller('veiculos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class VeiculosController {
  constructor(
    @Inject(VeiculoCreateService)
    private readonly createService: VeiculoCreateService,
    @Inject(VeiculoUpdateService)
    private readonly updateService: VeiculoUpdateService,
    @Inject(VeiculoFindService)
    private readonly findService: VeiculoFindService,
    @Inject(VeiculoFindAllService)
    private readonly findAllService: VeiculoFindAllService,
    @Inject(VeiculoDestroyService)
    private readonly destroyService: VeiculoDestroyService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 201,
    description: 'Veículo criado',
    type: CreateVeiculoOutput,
  })
  @ApiResponse({
    status: 400,
    description: 'Corpo da requisição inválido',
    type: ThrowableError,
  })
  @ApiResponse({
    status: 500,
    description: 'Não foi possível incluir o veículo',
  })
  async create(@Body() data: CreateVeiculoInput): Promise<CreateVeiculoOutput> {
    return await this.createService.execute(data);
  }

  @Put()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 200,
    description: 'Veículo atualizado',
    type: UpdateVeiculoOutput,
  })
  @ApiResponse({
    status: 201,
    description: 'Veículo criado',
    type: UpdateVeiculoOutput,
  })
  @ApiResponse({
    status: 404,
    description: 'Veículo não encontrado',
  })
  @ApiResponse({
    status: 500,
    description: 'Não foi possível atualizar os dados do veículo',
  })
  async update(@Body() data: UpdateVeiculoInput): Promise<UpdateVeiculoOutput> {
    return await this.updateService.execute(data);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Veículo encontrado',
    type: FindVeiculoOutput,
  })
  @ApiResponse({
    status: 404,
    description: 'Veículo não encontrado',
    type: NotFoundOutput,
  })
  async find(@Param('id') id: number): Promise<FindVeiculoOutput> {
    return await this.findService.execute(id);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Veículo(s) encontrado(s)',
    type: FindAllVeiculoOutput,
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum veículo encontrado',
    type: NotFoundOutput,
  })
  async findAll(
    @Query() query: FindAllVeiculoInput,
  ): Promise<FindAllVeiculoOutput> {
    return await this.findAllService.execute(query);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'O veículo foi deletado do sistema',
  })
  @ApiResponse({
    status: 404,
    description: 'Não foi possível deletar o veículo. O veículo não existe',
    type: NotFoundOutput,
  })
  @ApiResponse({
    status: 500,
    description: 'Não foi possível remover o veículo',
  })
  async destroy(@Param('id') id: number): Promise<void> {
    return await this.destroyService.execute(id);
  }
}
