import EstabelecimentosEntity from './estabelecimentos.entity';
import { Repository } from 'typeorm';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ICreateService } from '../@base/services/create.interface';
import { IUpdateService } from '../@base/services/update.interface';
import { IFindService } from '../@base/services/find.interface';
import { IFindAllService } from '../@base/services/findAll.interface';
import { IDestroyService } from '../@base/services/destroy.interface';
import {
  CreateEstabelecimentoInput,
  CreateEstabelecimentoOutput,
} from './dto/create.dto';
import {
  UpdateEstabelecimentoInput,
  UpdateEstabelecimentoOutput,
} from './dto/update.dto';
import { FindEstabelecimentoOutput } from './dto/find.dto';
import {
  FindAllEstabelecimentoInput,
  FindAllEstabelecimentoOutput,
} from './dto/findAll.dto';

@Injectable()
export default class EstabelecimentosServices
  implements
    ICreateService<CreateEstabelecimentoInput, CreateEstabelecimentoOutput>,
    IUpdateService<UpdateEstabelecimentoInput, UpdateEstabelecimentoOutput>,
    IFindService<FindEstabelecimentoOutput>,
    IFindAllService<FindAllEstabelecimentoInput, FindAllEstabelecimentoOutput>,
    IDestroyService
{
  constructor(
    @Inject('REPOSITORY')
    private repository: Repository<EstabelecimentosEntity>,
  ) {}

  async create(
    data: CreateEstabelecimentoInput,
  ): Promise<CreateEstabelecimentoOutput> {
    const created = await this.repository.save(data);

    if (!created) {
      throw new InternalServerErrorException(
        'Não foi possível criar o registro',
      );
    }

    return {
      id: created.id,
    };
  }

  update(
    data: UpdateEstabelecimentoInput,
  ): Promise<UpdateEstabelecimentoOutput> {
    throw new Error('Method not implemented.');
  }

  find(id: number): Promise<FindEstabelecimentoOutput> {
    throw new Error('Method not implemented.');
  }

  findAll(
    query: FindAllEstabelecimentoInput,
  ): Promise<FindAllEstabelecimentoOutput[]> {
    throw new Error('Method not implemented.');
  }

  destroy(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
