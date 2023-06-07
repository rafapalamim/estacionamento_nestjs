import { Test, TestingModule } from '@nestjs/testing';
import { SQLiteModule } from 'src/database/modules/sqlite.module';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { VeiculoController } from './veiculo.controller';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import {
  FindAllVeiculosDto,
  FindAllVeiculosOutputDto,
} from './dto/find-all-veiculos.dto';
import { veiculoProviders } from './veiculo.providers';
import { VeiculoService } from './veiculo.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';

describe('VeiculoController', () => {
  let controller: VeiculoController;

  const mockService = {
    create: jest.fn().mockImplementation(() => ({
      id: Date.now(),
    })),
    update: jest
      .fn()
      .mockImplementation((id: number, dto: UpdateVeiculoDto) => {
        if (id === 2) {
          throw new NotFoundException('Veículo não encontrado');
        }

        return {
          id: id,
          ...dto,
        };
      }),
    findOne: jest.fn().mockImplementation((id: number) => {
      if (id === 2) {
        throw new NotFoundException(`Veículo #${id} não encontrado`);
      }

      return {
        id: id,
        modelo: 'Gol',
        marca: 'Volkswagen',
        placa: 'ABC1234',
        cor: 'Vermelho',
        tipo: 'Hatch',
        created_at: new Date(),
        updated_at: new Date(),
      };
    }),
    findAll: jest.fn().mockImplementation((query: FindAllVeiculosDto) => {
      if (query.placa === 'ABC1235') {
        throw new NotFoundException('Nenhum veículo encontrado');
      }

      const retorno: FindAllVeiculosOutputDto = {
        data: [
          {
            id: Date.now(),
            modelo: 'Gol',
            marca: 'Volkswagen',
            placa: 'ABC1234',
            cor: 'Vermelho',
            tipo: 'Hatch',
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        paginacao: {
          paginaAtual: 0,
          totalDeRegistros: 1,
          ultimaPagina: 0,
        },
      };

      return retorno;
    }),
    remove: jest.fn().mockImplementation((id: number) => {
      if (id === 2) {
        throw new BadRequestException(
          `Não foi possível deletar o veículo ${id}. O veículo não existe`,
        );
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SQLiteModule],
      controllers: [VeiculoController],
      providers: [
        ...veiculoProviders,
        {
          provide: VeiculoService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<VeiculoController>(VeiculoController);
  });

  it('Controller definido', () => {
    expect(controller).toBeDefined();
  });

  it('Criar veículo', async () => {
    const input: CreateVeiculoDto = {
      modelo: 'Gol',
      marca: 'Volkswagen',
      placa: 'ABC1234',
      cor: 'Vermelho',
      tipo: 'Hatch',
    };

    const create = await controller.create(input);
    expect(create).toEqual({
      id: expect.any(Number),
    });
  });

  it('Atualizar veículo', async () => {
    const input: CreateVeiculoDto = {
      modelo: 'Gol 2',
      marca: 'Volkswagen',
      placa: 'ABC1234',
      cor: 'Vermelho',
      tipo: 'Hatch',
    };

    const update = await controller.update(1, input);
    expect(update).toEqual({
      id: 1,
      modelo: input.modelo,
      marca: input.marca,
      placa: input.placa,
      cor: input.cor,
      tipo: input.tipo,
    });
  });

  it('Falha ao atualizar estabelecimento não existente', async () => {
    const input: CreateVeiculoDto = {
      modelo: 'Gol 2',
      marca: 'Volkswagen',
      placa: 'ABC1234',
      cor: 'Vermelho',
      tipo: 'Hatch',
    };

    expect(async () => await controller.update(2, input)).rejects.toThrowError(
      'Veículo não encontrado',
    );
  });

  it('Procurar veículo pelo ID', async () => {
    const find = await controller.findOne(1);
    expect(find).toEqual({
      id: expect.any(Number),
      modelo: expect.any(String),
      marca: expect.any(String),
      placa: expect.any(String),
      cor: expect.any(String),
      tipo: expect.any(String),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('Falha ao procurar veículo por ID não existente', async () => {
    expect(async () => await controller.findOne(2)).rejects.toThrowError(
      'Veículo #2 não encontrado',
    );
  });

  it('Listar veículos', async () => {
    const list = await controller.findAll({});
    expect(list.data.length).toBe(1);
    expect(list.data).toEqual([
      {
        id: expect.any(Number),
        modelo: expect.any(String),
        marca: expect.any(String),
        placa: expect.any(String),
        cor: expect.any(String),
        tipo: expect.any(String),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      },
    ]);
  });

  it('Nenhum veículo encontrado (findAll)', async () => {
    expect(
      async () => await controller.findAll({ placa: 'ABC1235' }),
    ).rejects.toThrowError('Nenhum veículo encontrado');
  });

  it('Remover veículo pelo ID', async () => {
    expect(async () => await controller.remove(1)).not.toThrow(
      BadRequestException,
    );
  });

  it('Falha ao remover veículo não existente', async () => {
    expect(async () => await controller.remove(2)).rejects.toThrowError(
      `Não foi possível deletar o veículo 2. O veículo não existe`,
    );
  });
});
