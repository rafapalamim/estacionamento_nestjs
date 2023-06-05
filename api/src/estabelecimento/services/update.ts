import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { EstabelecimentoEntity } from '../entities/estabelecimento.entity';
import { Constants } from 'src/utils/constants.helper';
import {
  UpdateEstabelecimentoDto,
  UpdateEstabelecimentoOutputDto,
} from '../dto/update-estabelecimento.dto';

@Injectable()
export class EstabelecimentoUpdateService {
  constructor(
    @Inject(Constants.estabelecimentoRepositorio)
    private repository: Repository<EstabelecimentoEntity>,
  ) {}

  async execute(
    id: number,
    data: UpdateEstabelecimentoDto,
  ): Promise<UpdateEstabelecimentoOutputDto> {
    const search = await this.repository.findOneBy({ id });

    if (!search) {
      throw new NotFoundException('Estabelecimento não encontrado');
    }

    const newData = { ...search, ...data };

    const update = await this.repository.update(id, newData);

    if (update.affected < 1) {
      throw new InternalServerErrorException(
        'Não foi possível atualizar os dados do estabelecimento',
      );
    }

    return {
      id: newData.id,
      nome: newData.nome,
      cnpj: newData.cnpj,
      endereco: newData.endereco,
      telefone: newData.telefone,
      quantidade_vagas_motos: newData.quantidade_vagas_motos,
      quantidade_vagas_carros: newData.quantidade_vagas_carros,
    };
  }
}
