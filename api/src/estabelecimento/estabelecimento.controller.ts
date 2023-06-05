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
import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDto } from './dto/update-estabelecimento.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindAllEstabelecimentoDto } from './dto/find-all-estabelecimento.dto';

@ApiTags('estabelecimento')
@Controller('estabelecimento')
export class EstabelecimentoController {
  constructor(
    private readonly estabelecimentoService: EstabelecimentoService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createEstabelecimentoDto: CreateEstabelecimentoDto) {
    return this.estabelecimentoService.create(createEstabelecimentoDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id') id: number,
    @Body() updateEstabelecimentoDto: UpdateEstabelecimentoDto,
  ) {
    return this.estabelecimentoService.update(id, updateEstabelecimentoDto);
  }

  @Get()
  findAll(@Query() query: FindAllEstabelecimentoDto) {
    return this.estabelecimentoService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.estabelecimentoService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number) {
    return this.estabelecimentoService.remove(id);
  }
}
