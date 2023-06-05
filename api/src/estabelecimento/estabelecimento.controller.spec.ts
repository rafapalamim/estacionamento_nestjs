import { Test, TestingModule } from '@nestjs/testing';
import { EstabelecimentoController } from './estabelecimento.controller';
import { EstabelecimentoService } from './estabelecimento.service';
import { SQLiteModule } from 'src/database/modules/sqlite.module';
import { estabelecimentoProviders } from './estabelecimento.providers';
import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDto } from './dto/update-estabelecimento.dto';
import { FindAllEstabelecimentoDto } from './dto/find-all-estabelecimento.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('EstabelecimentoController', () => {
  let controller: EstabelecimentoController;

  const mockService = {
    create: jest.fn().mockImplementation(() => ({
      id: Date.now(),
    })),
    update: jest
      .fn()
      .mockImplementation((id: number, dto: UpdateEstabelecimentoDto) => {
        if (id === 2) {
          throw new NotFoundException('Estabelecimento não encontrado');
        }

        return {
          id: id,
          ...dto,
        };
      }),
    findOne: jest.fn().mockImplementation((id: number) => {
      if (id === 2) {
        throw new NotFoundException(`Estabelecimento #${id} não encontrado`);
      }

      return {
        id: id,
        nome: 'name',
        cnpj: '123456',
        endereco: 'Avenida',
        telefone: '551133332222',
        quantidade_vagas_motos: 1,
        quantidade_vagas_carros: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };
    }),
    findAll: jest
      .fn()
      .mockImplementation((query: FindAllEstabelecimentoDto) => {
        if (query.cnpj === '123') {
          throw new NotFoundException('Nenhum estabelecimento encontrado');
        }

        return [
          {
            id: Date.now(),
            nome: 'name',
            cnpj: '123456',
            endereco: 'Avenida',
            telefone: '551133332222',
            quantidade_vagas_motos: 1,
            quantidade_vagas_carros: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ];
      }),
    remove: jest.fn().mockImplementation((id: number) => {
      if (id === 2) {
        throw new BadRequestException(
          `Não foi possível deletar o estabelecimento ${id}. O estabelecimento não existe`,
        );
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SQLiteModule],
      controllers: [EstabelecimentoController],
      providers: [
        ...estabelecimentoProviders,
        {
          provide: EstabelecimentoService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<EstabelecimentoController>(
      EstabelecimentoController,
    );
  });

  it('Controller definido', () => {
    expect(controller).toBeDefined();
  });

  it('Criar estabelecimento', async () => {
    const input: CreateEstabelecimentoDto = {
      nome: 'John Doe',
      cnpj: '123456',
      endereco: 'Avenida',
      telefone: '5511912345678',
      quantidade_vagas_carros: 5,
      quantidade_vagas_motos: 3,
    };

    const create = await controller.create(input);
    expect(create).toEqual({
      id: expect.any(Number),
    });
  });

  it('Atualizar estabelecimento', async () => {
    const input: CreateEstabelecimentoDto = {
      nome: 'John Doe 2',
      cnpj: '123456',
      endereco: 'Avenida',
      telefone: '5511912345678',
      quantidade_vagas_carros: 5,
      quantidade_vagas_motos: 3,
    };

    const update = await controller.update(1, input);
    expect(update).toEqual({
      id: 1,
      nome: input.nome,
      cnpj: input.cnpj,
      endereco: input.endereco,
      telefone: input.telefone,
      quantidade_vagas_motos: input.quantidade_vagas_motos,
      quantidade_vagas_carros: input.quantidade_vagas_carros,
    });
  });

  it('Falha ao atualizar estabelecimento não existente', async () => {
    const input: CreateEstabelecimentoDto = {
      nome: 'John Doe 2',
      cnpj: '123456',
      endereco: 'Avenida',
      telefone: '5511912345678',
      quantidade_vagas_carros: 5,
      quantidade_vagas_motos: 3,
    };

    expect(async () => await controller.update(2, input)).rejects.toThrowError(
      'Estabelecimento não encontrado',
    );
  });

  it('Procurar estabelecimento pelo ID', async () => {
    const find = await controller.findOne(1);
    expect(find).toEqual({
      id: 1,
      nome: expect.any(String),
      cnpj: expect.any(String),
      endereco: expect.any(String),
      telefone: expect.any(String),
      quantidade_vagas_motos: expect.any(Number),
      quantidade_vagas_carros: expect.any(Number),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('Falha ao procurar estabelecimento por ID não existente', async () => {
    expect(async () => await controller.findOne(2)).rejects.toThrowError(
      'Estabelecimento #2 não encontrado',
    );
  });

  it('Listar estabelecimentos', async () => {
    const list = await controller.findAll({});
    expect(list.length).toBe(1);
    expect(list).toEqual([
      {
        id: expect.any(Number),
        nome: expect.any(String),
        cnpj: expect.any(String),
        endereco: expect.any(String),
        telefone: expect.any(String),
        quantidade_vagas_motos: expect.any(Number),
        quantidade_vagas_carros: expect.any(Number),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      },
    ]);
  });

  it('Nenhum estabelecimentos encontrado (findAll)', async () => {
    expect(
      async () => await controller.findAll({ cnpj: '123' }),
    ).rejects.toThrowError('Nenhum estabelecimento encontrado');
  });

  it('Remover estabelecimento pelo ID', async () => {
    expect(async () => await controller.remove(1)).not.toThrow(
      BadRequestException,
    );
  });

  it('Falha ao remover estabelecimento não existente', async () => {
    expect(async () => await controller.remove(2)).rejects.toThrowError(
      `Não foi possível deletar o estabelecimento 2. O estabelecimento não existe`,
    );
  });
});
