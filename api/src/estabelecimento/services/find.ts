import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EstabelecimentoEntity } from '../entities/estabelecimento.entity';
import { Constants } from 'src/utils/constants.helper';
import { FindEstabelecimentoOutputDto } from '../dto/find-estabelecimento.dto';

@Injectable()
export class EstabelecimentoFindOneService {
  constructor(
    @Inject(Constants.estabelecimentoRepositorio)
    private repository: Repository<EstabelecimentoEntity>,
  ) {}
  async execute(id: number): Promise<FindEstabelecimentoOutputDto> {
    const search = await this.repository.findOneBy({ id });

    if (!search) {
      throw new NotFoundException(`Estabelecimento #${id} não encontrado`);
    }

    return search;
  }
}
