import { Body, Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import EstabelecimentoCreateService from './services/create.service';
import {
  CreateEstabelecimentoInput,
  CreateEstabelecimentoOutput,
} from './dto/create.dto';

@ApiTags('estabelecimentos')
@Controller('api/v1/estabelecimentos')
export class EstabelecimentosController {
  constructor(
    @Inject(EstabelecimentoCreateService)
    private readonly createService: EstabelecimentoCreateService,
  ) {}

  async create(
    @Body() data: CreateEstabelecimentoInput,
  ): Promise<CreateEstabelecimentoOutput> {
    return await this.createService.execute(data);
  }
}
