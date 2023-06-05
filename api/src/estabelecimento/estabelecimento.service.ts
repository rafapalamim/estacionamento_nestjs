import { Inject, Injectable } from '@nestjs/common';
import {
  CreateEstabelecimentoDto,
  CreateEstabelecimentoOutputDto,
} from './dto/create-estabelecimento.dto';
import {
  UpdateEstabelecimentoDto,
  UpdateEstabelecimentoOutputDto,
} from './dto/update-estabelecimento.dto';
import { FindEstabelecimentoOutputDto } from './dto/find-estabelecimento.dto';
import {
  FindAllEstabelecimentoDto,
  FindAllEstabelecimentoOutputDto,
} from './dto/find-all-estabelecimento.dto';
import { EstabelecimentoCreateService } from './services/create';
import { EstabelecimentoUpdateService } from './services/update';
import { EstabelecimentoDeleteService } from './services/delete';
import { EstabelecimentoFindAllService } from './services/findAll';
import { EstabelecimentoFindOneService } from './services/find';

@Injectable()
export class EstabelecimentoService {
  constructor(
    @Inject(EstabelecimentoCreateService)
    private createService: EstabelecimentoCreateService,
    @Inject(EstabelecimentoUpdateService)
    private updateService: EstabelecimentoUpdateService,
    @Inject(EstabelecimentoDeleteService)
    private deleteService: EstabelecimentoDeleteService,
    @Inject(EstabelecimentoFindAllService)
    private findAllService: EstabelecimentoFindAllService,
    @Inject(EstabelecimentoFindOneService)
    private findOneService: EstabelecimentoFindOneService,
  ) {}

  async create(
    data: CreateEstabelecimentoDto,
  ): Promise<CreateEstabelecimentoOutputDto> {
    return await this.createService.execute(data);
  }

  async update(
    id: number,
    data: UpdateEstabelecimentoDto,
  ): Promise<UpdateEstabelecimentoOutputDto> {
    return await this.updateService.execute(id, data);
  }

  async findAll(
    query: FindAllEstabelecimentoDto,
  ): Promise<FindAllEstabelecimentoOutputDto> {
    return await this.findAllService.execute(query);
  }

  async findOne(id: number): Promise<FindEstabelecimentoOutputDto> {
    return await this.findOneService.execute(id);
  }

  async remove(id: number): Promise<void> {
    await this.deleteService.execute(id);
  }
}
