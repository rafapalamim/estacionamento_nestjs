import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindAllVeiculosDto } from './dto/find-all-veiculos.dto';

@ApiTags('veiculo')
@Controller('api/v1/veiculo')
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createVeiculoDto: CreateVeiculoDto) {
    return this.veiculoService.create(createVeiculoDto);
  }

  @Get()
  findAll(@Query() query: FindAllVeiculosDto) {
    return this.veiculoService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.veiculoService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: number, @Body() updateVeiculoDto: UpdateVeiculoDto) {
    return this.veiculoService.update(id, updateVeiculoDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number) {
    return this.veiculoService.remove(id);
  }
}
