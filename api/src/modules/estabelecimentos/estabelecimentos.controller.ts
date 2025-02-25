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
import EstabelecimentoCreateService from './services/create.service';
import EstabelecimentoUpdateService from './services/update.service';
import EstabelecimentoFindService from './services/find.service';
import EstabelecimentoFindAllService from './services/findAll.service';
import EstabelecimentoDestroyService from './services/destroy.service';
import {
  CreateEstabelecimentoInput,
  CreateEstabelecimentoOutput,
} from './dto/create.dto';
import { ThrowableError } from '../@base/dto/create.errors.output';
import {
  UpdateEstabelecimentoInput,
  UpdateEstabelecimentoOutput,
} from './dto/update.dto';
import {
  EstabelecimentoNotFound,
  FindEstabelecimentoOutput,
} from './dto/find.dto';
import {
  FindAllEstabelecimentoInput,
  FindAllEstabelecimentoOutput,
} from './dto/findAll.dto';
import { JwtAuthGuard } from '../autenticacao/guards/jwt.guard';
import { Unauthorized } from '../@base/dto/Unauthorized.output';

@ApiTags('estabelecimentos')
@Controller('estabelecimentos')
@UseGuards(JwtAuthGuard)
@ApiResponse({
  status: 401,
  description: 'Token JWT não informado',
  type: Unauthorized,
})
@ApiBearerAuth()
export class EstabelecimentosController {
  constructor(
    @Inject(EstabelecimentoCreateService)
    private readonly createService: EstabelecimentoCreateService,
    @Inject(EstabelecimentoUpdateService)
    private readonly updateService: EstabelecimentoUpdateService,
    @Inject(EstabelecimentoFindService)
    private readonly findService: EstabelecimentoFindService,
    @Inject(EstabelecimentoFindAllService)
    private readonly findAllService: EstabelecimentoFindAllService,
    @Inject(EstabelecimentoDestroyService)
    private readonly destroyService: EstabelecimentoDestroyService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 201,
    description: 'Estabelecimento criado',
    type: CreateEstabelecimentoOutput,
  })
  @ApiResponse({
    status: 400,
    description: 'Corpo da requisição inválido',
    type: ThrowableError,
  })
  @ApiResponse({
    status: 500,
    description: 'Não foi possível incluir o estabelecimento',
  })
  async create(
    @Body() data: CreateEstabelecimentoInput,
  ): Promise<CreateEstabelecimentoOutput> {
    return await this.createService.execute(data);
  }

  @Put()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 200,
    description: 'Estabelecimento atualizado',
    type: UpdateEstabelecimentoOutput,
  })
  @ApiResponse({
    status: 201,
    description: 'Estabelecimento criado',
    type: UpdateEstabelecimentoOutput,
  })
  @ApiResponse({
    status: 400,
    description: 'Corpo da requisição inválido',
    type: ThrowableError,
  })
  @ApiResponse({
    status: 404,
    description: 'Estabelecimento não encontrado',
  })
  @ApiResponse({
    status: 500,
    description: 'Não foi possível atualizar os dados do estabelecimento',
  })
  async update(
    @Body() data: UpdateEstabelecimentoInput,
  ): Promise<UpdateEstabelecimentoOutput> {
    return await this.updateService.execute(data);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Estabelecimento encontrado',
    type: FindEstabelecimentoOutput,
  })
  @ApiResponse({
    status: 404,
    description: 'Estabelecimento não encontrado',
    type: EstabelecimentoNotFound,
  })
  async find(@Param('id') id: number): Promise<FindEstabelecimentoOutput> {
    return await this.findService.execute(id);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description:
      'Estabelecimento(s) encontrado(s). Caso não encontre registro(s) de acordo com o filtro informado, o atributo data devolve um array vazio',
    type: FindAllEstabelecimentoOutput,
  })
  async findAll(
    @Query() query: FindAllEstabelecimentoInput,
  ): Promise<FindAllEstabelecimentoOutput> {
    return await this.findAllService.execute(query);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'O estabelecimento foi deletado do sistema',
  })
  @ApiResponse({
    status: 404,
    description:
      'Não foi possível deletar o estabelecimento. O estabelecimento não existe',
  })
  @ApiResponse({
    status: 500,
    description: 'Não foi possível remover o estabelecimento',
  })
  async destroy(@Param('id') id: number): Promise<void> {
    return await this.destroyService.execute(id);
  }
}
