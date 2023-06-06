import { Inject, Injectable } from '@nestjs/common';
import {
  CreateVeiculoDto,
  CreateVeiculoOutputDto,
} from './dto/create-veiculo.dto';
import {
  UpdateVeiculoDto,
  UpdateVeiculoOutputDto,
} from './dto/update-veiculo.dto';
import { VeiculoCreateService } from './services/create';
import { VeiculoUpdateService } from './services/update';
import { VeiculoDeleteService } from './services/delete';
import { VeiculoFindAllService } from './services/findAll';
import { VeiculoFindOneService } from './services/find';
import {
  FindAllVeiculosDto,
  FindAllVeiculosOutputDto,
} from './dto/find-all-veiculos.dto';
import { FindVeiculoOutputDto } from './dto/find-veiculo.dto';

@Injectable()
export class VeiculoService {
  constructor(
    @Inject(VeiculoCreateService)
    private createService: VeiculoCreateService,
    @Inject(VeiculoUpdateService)
    private updateService: VeiculoUpdateService,
    @Inject(VeiculoDeleteService)
    private deleteService: VeiculoDeleteService,
    @Inject(VeiculoFindAllService)
    private findAllService: VeiculoFindAllService,
    @Inject(VeiculoFindOneService)
    private findOneService: VeiculoFindOneService,
  ) {}

  async create(data: CreateVeiculoDto): Promise<CreateVeiculoOutputDto> {
    return await this.createService.execute(data);
  }

  async findAll(query: FindAllVeiculosDto): Promise<FindAllVeiculosOutputDto> {
    return await this.findAllService.execute(query);
  }

  async findOne(id: number): Promise<FindVeiculoOutputDto> {
    return await this.findOneService.execute(id);
  }

  async update(
    id: number,
    data: UpdateVeiculoDto,
  ): Promise<UpdateVeiculoOutputDto> {
    return await this.updateService.execute(id, data);
  }

  async remove(id: number): Promise<void> {
    return await this.deleteService.execute(id);
  }
}
