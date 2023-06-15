import { ICreateService } from 'src/modules/@base/services/create.interface';
import { CreateEntradaInput, CreateEntradaOutput } from '../dto/create.dto';
import ControlesEntity from '../../controles.entity';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import EstabelecimentoFindService from 'src/modules/estabelecimentos/services/find.service';
import VeiculoCreateService from 'src/modules/veiculos/services/create.service';
import VeiculoFindAllService from 'src/modules/veiculos/services/findAll.service';
import ControleFindAllService from '../../services/findAll.service';
import { FindAllControleOutput } from '../../dto/findAll.dto';
import VeiculosEntity from 'src/modules/veiculos/veiculos.entity';
import { TipoVeiculoEnum } from 'src/modules/@base/enums/tipo.veiculo.enum';
import { MessagesAPI } from 'src/utils/messages.helper';
import { Constants } from 'src/utils/constants.helper';

@Injectable()
export default class EntradaCreateService
  implements ICreateService<CreateEntradaInput, CreateEntradaOutput>
{
  constructor(
    @Inject(Constants.controleRepositorio)
    private repository: Repository<ControlesEntity>,

    @Inject(EstabelecimentoFindService)
    private readonly estabelecimentoFindService: EstabelecimentoFindService,

    @Inject(VeiculoCreateService)
    private readonly veiculoCreateService: VeiculoCreateService,

    @Inject(VeiculoFindAllService)
    private readonly veiculoFindAllService: VeiculoFindAllService,

    @Inject(ControleFindAllService)
    private readonly controleFindAllService: ControleFindAllService,
  ) {}

  async execute(data: CreateEntradaInput): Promise<CreateEntradaOutput> {
    const { estabelecimento_id, veiculo_placa, veiculo_tipo, ...veiculo_data } =
      data;

    const estabelecimento = await this.estabelecimentoFindService.execute(
      estabelecimento_id,
    );

    if (!estabelecimento)
      throw new BadRequestException(MessagesAPI.ESTABELECIMENTO.FIND.NOT_FOUND);

    const quantidadeMaxima =
      veiculo_tipo === TipoVeiculoEnum.CARRO
        ? estabelecimento.quantidade_vagas_carros
        : estabelecimento.quantidade_vagas_motos;

    const disponibilidade: FindAllControleOutput =
      await this.controleFindAllService.execute({
        em_aberto: true,
        cancelados: false,
        estabelecimento_id: estabelecimento_id,
        veiculo_tipo: veiculo_tipo,
      });

    if (disponibilidade.pagination.total >= quantidadeMaxima) {
      throw new BadRequestException(MessagesAPI.CONTROLE.CREATE.LIMIT);
    }

    const listaVeiculos = await this.veiculoFindAllService.execute({
      placa: veiculo_placa,
    });

    let veiculo: Partial<VeiculosEntity>;

    if (listaVeiculos.data.length < 1) {
      if (Object.entries(veiculo_data).length !== 3) {
        throw new BadRequestException(
          MessagesAPI.CONTROLE.CREATE.VEHICLE_EMPTY_DATA,
        );
      }

      Object.entries(veiculo_data).map((field) => {
        if (field[1].trim() === '') {
          throw new BadRequestException(
            MessagesAPI.CONTROLE.CREATE.VEHICLE_WRONG_DATA,
          );
        }
      });

      const veiculoInsert = await this.veiculoCreateService.execute({
        modelo: veiculo_data.veiculo_modelo,
        cor: veiculo_data.veiculo_cor,
        marca: veiculo_data.veiculo_marca,
        placa: veiculo_placa,
        tipo: veiculo_tipo,
      });

      veiculo = {
        id: veiculoInsert.id,
        marca: veiculo_data.veiculo_marca,
        modelo: veiculo_data.veiculo_modelo,
        tipo: veiculo_tipo,
        placa: veiculo_placa,
        cor: veiculo_data.veiculo_cor,
      };
    } else {
      veiculo = listaVeiculos.data[0];

      const temEntradaVigente = await this.controleFindAllService.execute({
        estabelecimento_id: estabelecimento_id,
        em_aberto: true,
        veiculo_id: veiculo.id,
      });

      if (temEntradaVigente.pagination.total >= 1) {
        throw new BadRequestException(
          MessagesAPI.CONTROLE.CREATE.VEHICLE_INSIDE_COMPANY,
        );
      }
    }

    const entityControle = this.repository.create({
      estabelecimento_id: estabelecimento_id,
      veiculo_id: veiculo.id,
      veiculo_tipo: veiculo.tipo,
      data_entrada: new Date(),
    });

    await this.repository.insert(entityControle);

    if (!entityControle) {
      throw new InternalServerErrorException(
        MessagesAPI.CONTROLE.CREATE.SERVER_ERROR,
      );
    }

    return {
      id: entityControle.id,
    };
  }
}
