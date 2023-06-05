import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EstabelecimentoEntity } from '../entities/estabelecimento.entity';
import {
  CreateEstabelecimentoDto,
  CreateEstabelecimentoOutputDto,
} from '../dto/create-estabelecimento.dto';
import { Constants } from 'src/utils/constants.helper';

@Injectable()
export class EstabelecimentoCreateService {
  constructor(
    @Inject(Constants.estabelecimentoRepositorio)
    private repository: Repository<EstabelecimentoEntity>,
  ) {}
  async execute(
    data: CreateEstabelecimentoDto,
  ): Promise<CreateEstabelecimentoOutputDto> {
    const estabelecimento = await this.repository.save(data);

    return {
      id: estabelecimento.id,
    };
  }
}
