import { Test, TestingModule } from '@nestjs/testing';
import { ControlesController } from '../controles.controller';
import { SQLiteModule } from 'src/database/modules/sqlite.module';
import { DataSource } from 'typeorm';
import ControlesEntity from '../controles.entity';
import ControleFindAllService from '../services/findAll.service';
import ControleFindService from '../services/find.service';
import ControleDestroyService from '../services/destroy.service';
import EntradaCreateService from '../entrada/services/create.service';
import SaidaUpdateService from '../saida/services/update.service';
import {
  FindAllControleInput,
  FindAllControleOutput,
} from '../dto/findAll.dto';
import { FindControleOutput } from '../dto/find.dto';
import { NotFoundException } from '@nestjs/common';
import { MessagesAPI } from 'src/utils/messages.helper';
import { TipoVeiculoEnum } from 'src/modules/@base/enums/tipo.veiculo.enum';
import { CreateEntradaInput } from '../entrada/dto/create.dto';
import { Constants } from 'src/utils/constants.helper';
import VeiculosEntity from 'src/modules/veiculos/veiculos.entity';
import EstabelecimentosEntity from 'src/modules/estabelecimentos/estabelecimentos.entity';

describe('ControlesController', () => {
  let controller: ControlesController;

  const mockFindAllService = {
    execute: jest
      .fn()
      .mockImplementation(
        (data: FindAllControleInput): FindAllControleOutput => {
          const dados = [
            {
              id: Date.now(),
              estabelecimento_id: 1,
              veiculo_id: 1,
              data_entrada: new Date(),
              data_saida: null,
              created_at: new Date(),
              updated_at: new Date(),
              deleted_at: null,
            },
            {
              id: Date.now(),
              estabelecimento_id: 1,
              veiculo_id: 2,
              data_entrada: new Date(),
              data_saida: new Date(),
              created_at: new Date(),
              updated_at: new Date(),
              deleted_at: null,
            },
            {
              id: Date.now(),
              estabelecimento_id: 1,
              veiculo_id: 2,
              data_entrada: new Date(),
              data_saida: null,
              created_at: new Date(),
              updated_at: new Date(),
              deleted_at: new Date(),
            },
          ];

          const filter = dados.filter((row: FindControleOutput) => {
            if (data.em_aberto === true && row.data_saida !== null) {
              return false;
            }

            if (data.cancelados === false && row.deleted_at !== null) {
              return false;
            }

            if (
              data.estabelecimento_id &&
              row.estabelecimento_id != data.estabelecimento_id
            ) {
              return false;
            }

            if (data.veiculo_id && row.veiculo_id != data.veiculo_id) {
              return false;
            }

            return true;
          });

          return {
            data: filter,
            pagination: {
              paginaAtual: 0,
              total: filter.length,
              ultimaPagina: 0,
            },
          };
        },
      ),
  };

  const mockFindService = {
    execute: jest.fn().mockImplementation((id: number): FindControleOutput => {
      if (id > 10) {
        throw new NotFoundException(MessagesAPI.CONTROLE.FIND.NOT_FOUND);
      }

      return {
        id: id,
        estabelecimento_id: 1,
        veiculo_id: 1,
        data_entrada: new Date(),
        data_saida: id === 2 ? new Date() : null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };
    }),
  };

  const mockDestroyService = {
    execute: jest.fn().mockImplementation((id: number): void => {
      if (id >= 999) {
        throw new NotFoundException(MessagesAPI.CONTROLE.DESTROY.NOT_FOUND);
      }
    }),
  };

  const mockCreateService = {
    execute: jest.fn().mockImplementation((data: CreateEntradaInput) => {
      return {
        id: data.estabelecimento_id > 10 ? Date.now() : 1,
      };
    }),
  };

  const mockUpdateService = {
    execute: jest.fn().mockImplementation((id: number): void => {
      if (id >= 999) {
        throw new NotFoundException(MessagesAPI.CONTROLE.UPDATE.NOT_FOUND);
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SQLiteModule],
      controllers: [ControlesController],
      providers: [
        {
          provide: Constants.controleRepositorio,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(ControlesEntity),
          inject: ['DATA_SOURCE'],
        },
        {
          provide: Constants.veiculoRepositorio,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(VeiculosEntity),
          inject: ['DATA_SOURCE'],
        },
        {
          provide: Constants.estabelecimentoRepositorio,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(EstabelecimentosEntity),
          inject: ['DATA_SOURCE'],
        },
        {
          provide: ControleFindAllService,
          useValue: mockFindAllService,
        },
        {
          provide: ControleFindService,
          useValue: mockFindService,
        },
        {
          provide: ControleDestroyService,
          useValue: mockDestroyService,
        },
        {
          provide: EntradaCreateService,
          useValue: mockCreateService,
        },
        {
          provide: SaidaUpdateService,
          useValue: mockUpdateService,
        },
      ],
    }).compile();

    controller = module.get<ControlesController>(ControlesController);
  });

  it('Controller definido', () => {
    expect(controller).toBeDefined();
  });

  it('Deve criar uma entrada', async () => {
    const entrada = await controller.create({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC1111',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
    });

    expect(entrada.id).toEqual(expect.any(Number));
  });

  it('Deve criar uma entrada informando os dados de um novo veículo', async () => {
    const entrada = await controller.create({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC1111',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
      veiculo_cor: 'Prata',
      veiculo_marca: 'Volkswagen',
      veiculo_modelo: 'Gol',
    });

    expect(entrada.id).toEqual(expect.any(Number));
  });

  it('Deve criar uma entrada informando os dados de um novo veículo', async () => {
    const entrada = await controller.create({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC1111',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
      veiculo_cor: 'Prata',
      veiculo_marca: 'Volkswagen',
      veiculo_modelo: 'Gol',
    });

    expect(entrada.id).toEqual(expect.any(Number));
  });

  it('Deve registrar uma saída', async () => {
    const entrada = await controller.create({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC1111',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
      veiculo_cor: 'Prata',
      veiculo_marca: 'Volkswagen',
      veiculo_modelo: 'Gol',
    });

    const saida = await controller.update(entrada.id);
    expect(saida).toBeUndefined();
  });

  it('Não deve registrar uma saída com ID inválido', async () => {
    const entrada = await controller.create({
      estabelecimento_id: 50,
      veiculo_placa: 'ABC1111',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
      veiculo_cor: 'Prata',
      veiculo_marca: 'Volkswagen',
      veiculo_modelo: 'Gol',
    });

    expect(
      async () => await controller.update(entrada.id),
    ).rejects.toThrowError(MessagesAPI.CONTROLE.UPDATE.NOT_FOUND);
  });

  it('Deve cancelar uma entrada', async () => {
    const entrada = await controller.create({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC1111',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
    });

    const cancelamento = await controller.destroy(entrada.id);

    expect(cancelamento).toBeUndefined();
  });

  it('Deve encontrar uma entrada', async () => {
    const entrada = await controller.create({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC1111',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
    });

    const find = await controller.find(entrada.id);

    expect(find).toEqual({
      id: expect.any(Number),
      estabelecimento_id: expect.any(Number),
      veiculo_id: expect.any(Number),
      data_entrada: expect.any(Date),
      data_saida: null,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      deleted_at: null,
    } as FindControleOutput);
  });

  it('Não deve encontrar uma entrada com ID inválido', async () => {
    expect(async () => await controller.find(11)).rejects.toThrowError(
      MessagesAPI.CONTROLE.FIND.NOT_FOUND,
    );
  });

  it('Deve encontrar entradas sem filtro nenhum', async () => {
    const findAll = await controller.findAll({});
    expect(findAll.pagination.total).toBe(3);
  });

  it('Deve encontrar entradas por estabelecimento', async () => {
    const findAll = await controller.findAll({ estabelecimento_id: 1 });
    expect(findAll.pagination.total).toBe(3);
  });

  it('Deve encontrar entradas por estabelecimento e em aberto', async () => {
    const findAll = await controller.findAll({
      estabelecimento_id: 1,
      em_aberto: true,
      cancelados: false,
    });
    expect(findAll.pagination.total).toBe(1);
  });

  it('Deve encontrar entradas removendo as canceladas', async () => {
    const findAll = await controller.findAll({ cancelados: false });
    expect(findAll.pagination.total).toBe(2);
  });

  it('Deve encontrar entradas apenas em aberto', async () => {
    const findAll = await controller.findAll({
      em_aberto: true,
      cancelados: false,
    });
    expect(findAll.pagination.total).toBe(1);
  });

  it('Não deve encontrar entradas do estabelecimento', async () => {
    const findAll = await controller.findAll({
      em_aberto: true,
      cancelados: false,
      estabelecimento_id: 500,
    });
    expect(findAll.data.length).toBe(0);
    expect(findAll.pagination.total).toBe(0);
  });
});
