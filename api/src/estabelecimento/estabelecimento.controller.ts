import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import {
  CreateEstabelecimentoDto,
  CreateEstabelecimentoErrorOutputDto,
  CreateEstabelecimentoOutputDto,
} from './dto/create-estabelecimento.dto';
import {
  UpdateEstabelecimentoDto,
  UpdateEstabelecimentoOutputDto,
} from './dto/update-estabelecimento.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  FindAllEstabelecimentoDto,
  FindAllEstabelecimentoOutputDto,
} from './dto/find-all-estabelecimento.dto';
import { FindEstabelecimentoOutputDto } from './dto/find-estabelecimento.dto';

@ApiTags('estabelecimento')
@Controller('api/v1/estabelecimento')
export class EstabelecimentoController {
  constructor(
    private readonly estabelecimentoService: EstabelecimentoService,
  ) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Estabelecimento encontrado',
    type: FindEstabelecimentoOutputDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Estabelecimento não encontrado',
  })
  findOne(@Param('id') id: number) {
    return this.estabelecimentoService.findOne(id);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Estabelecimento(s) encontrado(s)',
    type: FindAllEstabelecimentoOutputDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum estabelecimento encontrado',
  })
  findAll(@Query() query: FindAllEstabelecimentoDto) {
    return this.estabelecimentoService.findAll(query);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 201,
    description: 'Estabelecimento criado',
    type: CreateEstabelecimentoOutputDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Corpo da requisição inválido',
    type: CreateEstabelecimentoErrorOutputDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Não foi possível incluir o estabelecimento',
  })
  create(@Body() createEstabelecimentoDto: CreateEstabelecimentoDto) {
    return this.estabelecimentoService.create(createEstabelecimentoDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 200,
    description: 'Estabelecimento atualizado',
    type: UpdateEstabelecimentoOutputDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Estabelecimento não encontrado',
  })
  @ApiResponse({
    status: 500,
    description: 'Não foi possível atualizar os dados do estabelecimento',
  })
  update(
    @Param('id') id: number,
    @Body() updateEstabelecimentoDto: UpdateEstabelecimentoDto,
  ) {
    return this.estabelecimentoService.update(id, updateEstabelecimentoDto);
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
  remove(@Param('id') id: number) {
    return this.estabelecimentoService.remove(id);
  }
}
