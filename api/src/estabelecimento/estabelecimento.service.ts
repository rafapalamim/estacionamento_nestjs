import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateEstabelecimentoDto,
  CreateEstabelecimentoOutputDto,
} from './dto/create-estabelecimento.dto';
import {
  UpdateEstabelecimentoDto,
  UpdateEstabelecimentoOutputDto,
} from './dto/update-estabelecimento.dto';
import { Repository } from 'typeorm';
import { EstabelecimentoEntity } from './entities/estabelecimento.entity';
import { FindEstabelecimentoOutputDto } from './dto/find-estabelecimento.dto';
import {
  FindAllEstabelecimentoDto,
  FindAllEstabelecimentoOutputDto,
} from './dto/find-all-estabelecimento.dto';
import { Constants } from 'src/utils/constants.helper';

@Injectable()
export class EstabelecimentoService {
  constructor(
    @Inject(Constants.estabelecimentoRepositorio)
    private repository: Repository<EstabelecimentoEntity>,
  ) {}

  async create(
    data: CreateEstabelecimentoDto,
  ): Promise<CreateEstabelecimentoOutputDto> {
    const estabelecimento = await this.repository.save(data);
    return {
      id: estabelecimento.id,
    };
  }

  async update(
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

  async findAll(
    query: FindAllEstabelecimentoDto,
  ): Promise<FindAllEstabelecimentoOutputDto[]> {
    const { pagina, ...params } = query;

    const search = await this.repository.findBy(params);

    if (search.length < 1) {
      throw new NotFoundException('Nenhum estabelecimento encontrado');
    }

    return search.map((estabelecimento: EstabelecimentoEntity) => {
      return { ...estabelecimento };
    });
  }

  async findOne(id: number): Promise<FindEstabelecimentoOutputDto> {
    const search = await this.repository.findOneBy({ id });

    if (!search) {
      throw new NotFoundException(`Estabelecimento #${id} não encontrado`);
    }

    return search;
  }

  async remove(id: number): Promise<void> {
    const search = await this.repository.countBy({ id });

    if (search.valueOf() < 1) {
      throw new BadRequestException(
        `Não foi possível deletar o estabelecimento ${id}. O estabelecimento não existe`,
      );
    }

    const deleted = await this.repository.delete({ id });

    if (deleted.affected < 1) {
      throw new InternalServerErrorException(
        'Não foi possível remover o estabelecimento',
      );
    }
  }
}
