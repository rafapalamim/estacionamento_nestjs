import { Test, TestingModule } from '@nestjs/testing';
import EntradaCreateService from '../entrada/services/create.service';
import SaidaUpdateService from '../saida/services/update.service';
import ControleDestroyService from '../services/destroy.service';
import ControleFindService from '../services/find.service';
import ControleFindAllService from '../services/findAll.service';
import { SQLiteModule } from 'src/database/modules/sqlite.module';
import EstabelecimentoFindService from 'src/modules/estabelecimentos/services/find.service';
import { FindEstabelecimentoOutput } from 'src/modules/estabelecimentos/dto/find.dto';
import { CreateVeiculoOutput } from 'src/modules/veiculos/dto/create.dto';
import VeiculoCreateService from 'src/modules/veiculos/services/create.service';
import VeiculoFindAllService from 'src/modules/veiculos/services/findAll.service';
import { FindAllVeiculoInput } from 'src/modules/veiculos/dto/findAll.dto';
import { DataSource } from 'typeorm';
import ControlesEntity from '../controles.entity';
import { TipoVeiculoEnum } from 'src/modules/@base/enums/tipo.veiculo.enum';
import { MessagesAPI } from 'src/utils/messages.helper';
import { Constants } from 'src/utils/constants.helper';

describe('ControleServices', () => {
  let createService: EntradaCreateService;
  let updateService: SaidaUpdateService;
  let findService: ControleFindService;
  let findAllService: ControleFindAllService;
  let destroyService: ControleDestroyService;

  const mockFindEstabelecimentoService = {
    execute: jest.fn().mockImplementation(() => {
      return {
        id: 1,
        nome: 'Estabelecimento',
        cnpj: '12345678910000',
        endereco: 'Rua dois, 1000',
        quantidade_vagas_carros: 2,
        quantidade_vagas_motos: 2,
        telefone: '5511988884444',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      } as FindEstabelecimentoOutput;
    }),
  };

  const mockVeiculoCreateService = {
    execute: jest.fn().mockImplementation(() => {
      return {
        id: Date.now(),
      } as CreateVeiculoOutput;
    }),
  };

  const mockVeiculoFindAllService = {
    execute: jest.fn().mockImplementation((data: FindAllVeiculoInput) => {
      if (data.placa == 'ABC9999') {
        return {
          data: [],
          pagination: {
            paginaAtual: 0,
            total: 0,
            ultimaPagina: 0,
          },
        };
      }

      return {
        data: [
          {
            id: data.placa === 'CCC1111' ? 1 : Date.now(),
            marca: 'Fiat',
            modelo: 'Palio',
            placa: data.placa,
            cor: 'Azul',
            tipo: 'CARRO',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
          },
        ],
        pagination: {
          paginaAtual: 0,
          total: 1,
          ultimaPagina: 0,
        },
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SQLiteModule],
      providers: [
        {
          provide: Constants.controleRepositorio,
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(ControlesEntity),
          inject: ['DATA_SOURCE'],
        },
        {
          provide: EstabelecimentoFindService,
          useValue: mockFindEstabelecimentoService,
        },
        {
          provide: VeiculoCreateService,
          useValue: mockVeiculoCreateService,
        },
        {
          provide: VeiculoFindAllService,
          useValue: mockVeiculoFindAllService,
        },
        ControleFindAllService,
        ControleFindService,
        ControleDestroyService,
        EntradaCreateService,
        SaidaUpdateService,
      ],
    }).compile();

    createService = module.get<EntradaCreateService>(EntradaCreateService);

    updateService = module.get<SaidaUpdateService>(SaidaUpdateService);

    findService = module.get<ControleFindService>(ControleFindService);

    destroyService = module.get<ControleDestroyService>(ControleDestroyService);

    findAllService = module.get<ControleFindAllService>(ControleFindAllService);
  });

  it('Os serviços devem estar definidos', () => {
    expect(createService).toBeDefined();
    expect(updateService).toBeDefined();
    expect(findService).toBeDefined();
    expect(findAllService).toBeDefined();
    expect(destroyService).toBeDefined();
  });

  it('Deve criar uma entrada informando um veículo existente', async () => {
    const entrada = await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC1234',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
    });

    expect(entrada.id).toEqual(expect.any(Number));
  });

  it('Deve criar uma entrada informando os dados de um novo veículo', async () => {
    const entrada = await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC1235',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
      veiculo_cor: 'Azul',
      veiculo_marca: 'Fiat',
      veiculo_modelo: 'Palio',
    });

    expect(entrada.id).toEqual(expect.any(Number));
  });

  it('Não deve registrar uma entrada enquanto o veículo estiver com uma entrada vigente (em aberto)', async () => {
    await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'CCC1111',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
    });

    expect(
      async () =>
        await createService.execute({
          estabelecimento_id: 1,
          veiculo_placa: 'CCC1111',
          veiculo_tipo: TipoVeiculoEnum.CARRO,
        }),
    ).rejects.toThrowError(MessagesAPI.CONTROLE.CREATE.VEHICLE_INSIDE_COMPANY);
  });

  it('Não deve aceitar registrar uma entrada caso o limite do estabelecimento tenha sido alcançado', async () => {
    await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC1111',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
    });

    await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC2222',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
    });
    expect(
      async () =>
        await createService.execute({
          estabelecimento_id: 1,
          veiculo_placa: 'ABC3333',
          veiculo_tipo: TipoVeiculoEnum.CARRO,
        }),
    ).rejects.toThrowError(MessagesAPI.CONTROLE.CREATE.LIMIT);
  });

  it('Deve registrar uma entrada informando dados para a criação de um veículo', async () => {
    const entrada = await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC9999',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
      veiculo_cor: 'Azul',
      veiculo_marca: 'Fiat',
      veiculo_modelo: 'Palio',
    });

    expect(entrada.id).toEqual(expect.any(Number));
  });

  it('Não deve registrar uma entrada informando dados incorretos para a criação de um veículo', async () => {
    expect(
      async () =>
        await createService.execute({
          estabelecimento_id: 1,
          veiculo_placa: 'ABC9999',
          veiculo_tipo: TipoVeiculoEnum.CARRO,
        }),
    ).rejects.toThrowError(MessagesAPI.CONTROLE.CREATE.VEHICLE_EMPTY_DATA);
  });

  it('Não deve registrar uma entrada informando dados incorretos (em branca) para a criação de um veículo', async () => {
    expect(
      async () =>
        await createService.execute({
          estabelecimento_id: 1,
          veiculo_placa: 'ABC9999',
          veiculo_tipo: TipoVeiculoEnum.CARRO,
          veiculo_cor: '',
          veiculo_marca: '',
          veiculo_modelo: '',
        }),
    ).rejects.toThrowError(MessagesAPI.CONTROLE.CREATE.VEHICLE_WRONG_DATA);

    expect(
      async () =>
        await createService.execute({
          estabelecimento_id: 1,
          veiculo_placa: 'ABC9999',
          veiculo_tipo: TipoVeiculoEnum.CARRO,
          veiculo_cor: 'X',
          veiculo_marca: '',
          veiculo_modelo: '',
        }),
    ).rejects.toThrowError(MessagesAPI.CONTROLE.CREATE.VEHICLE_WRONG_DATA);

    expect(
      async () =>
        await createService.execute({
          estabelecimento_id: 1,
          veiculo_placa: 'ABC9999',
          veiculo_tipo: TipoVeiculoEnum.CARRO,
          veiculo_cor: 'X',
          veiculo_marca: 'P',
          veiculo_modelo: '',
        }),
    ).rejects.toThrowError(MessagesAPI.CONTROLE.CREATE.VEHICLE_WRONG_DATA);
  });

  it('Deve registar a saída', async () => {
    const entrada = await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC1234',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
    });

    const saida = await updateService.execute(entrada.id);

    expect(saida).toBeUndefined();
  });

  it('Não deve registar a saída de uma entrada inexistente', async () => {
    expect(async () => await updateService.execute(5)).rejects.toThrowError(
      MessagesAPI.CONTROLE.UPDATE.NOT_FOUND,
    );
  });

  it('Não deve registar a saída mais de uma vez', async () => {
    const entrada = await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC1234',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
    });

    await updateService.execute(entrada.id);

    expect(
      async () => await updateService.execute(entrada.id),
    ).rejects.toThrowError(MessagesAPI.CONTROLE.UPDATE.BAD_REQUEST);
  });

  it('Deve encontrar uma entrada', async () => {
    const entrada = await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC1234',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
    });

    const find = await findService.execute(entrada.id);

    expect(find).toEqual({
      id: expect.any(Number),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      deleted_at: null,
      estabelecimento_id: expect.any(Number),
      veiculo_id: expect.any(Number),
      veiculo_tipo: expect.any(String),
      data_entrada: expect.any(Date),
      data_saida: null,
    });
  });

  it('Não deve encontrar uma entrada inexistente', async () => {
    expect(async () => await findService.execute(1)).rejects.toThrowError(
      MessagesAPI.CONTROLE.FIND.NOT_FOUND,
    );
  });

  it('Deve encontrar todas as entradas válidas sem filtro algum', async () => {
    await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC1111',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
    });

    await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC2222',
      veiculo_tipo: TipoVeiculoEnum.MOTO,
    });

    await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC3333',
      veiculo_tipo: TipoVeiculoEnum.MOTO,
    });

    await updateService.execute(1);
    await updateService.execute(2);

    const findAll = await findAllService.execute({});

    expect(findAll.pagination.total).toBe(3);
  });

  it('Deve encontrar todas as entradas sem saída', async () => {
    await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC1111',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
    });

    await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC2222',
      veiculo_tipo: TipoVeiculoEnum.MOTO,
    });

    await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC3333',
      veiculo_tipo: TipoVeiculoEnum.MOTO,
    });

    await updateService.execute(1);
    await updateService.execute(2);

    const findAll = await findAllService.execute({
      em_aberto: true,
    });

    expect(findAll.pagination.total).toBe(1);
    expect(findAll.data[0].id).toBe(3);
  });

  it('Deve encontrar todas as entradas apenas com saída', async () => {
    await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC1111',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
    });

    await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC2222',
      veiculo_tipo: TipoVeiculoEnum.MOTO,
    });

    await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC3333',
      veiculo_tipo: TipoVeiculoEnum.MOTO,
    });

    await updateService.execute(1);

    const findAll = await findAllService.execute({ em_aberto: false });

    expect(findAll.pagination.total).toBe(1);
    expect(findAll.data[0].id).toBe(1);
  });

  it('Deve encontrar todas as entradas, até as canceladas', async () => {
    await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC1111',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
    });

    await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC2222',
      veiculo_tipo: TipoVeiculoEnum.MOTO,
    });

    await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC3333',
      veiculo_tipo: TipoVeiculoEnum.MOTO,
    });

    await updateService.execute(1);
    await destroyService.execute(2);
    const findAll = await findAllService.execute({});

    expect(findAll.pagination.total).toBe(3);
  });

  it('Deve encontrar todas as entradas, menos as canceladas', async () => {
    await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC1111',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
    });

    await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC2222',
      veiculo_tipo: TipoVeiculoEnum.MOTO,
    });

    await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC3333',
      veiculo_tipo: TipoVeiculoEnum.MOTO,
    });

    await destroyService.execute(1);
    await destroyService.execute(2);

    const findAll = await findAllService.execute({ cancelados: false });

    expect(findAll.pagination.total).toBe(1);
  });

  it('Deve cancelar uma entrada', async () => {
    const entrada = await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC1234',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
    });

    const deleted = await destroyService.execute(entrada.id);
    expect(deleted).toBeUndefined();

    const find = await findAllService.execute({
      estabelecimento_id: 1,
      cancelados: true,
    });

    expect(find.data.length).toBe(1);
    expect(find.data[0].deleted_at).toEqual(expect.any(Date));
  });

  it('Não deve cancelar uma entrada com ID inexistente', async () => {
    expect(async () => await destroyService.execute(1)).rejects.toThrowError(
      MessagesAPI.CONTROLE.DESTROY.NOT_FOUND,
    );
  });

  it('Não deve cancelar uma entrada mais de uma vez', async () => {
    const entrada = await createService.execute({
      estabelecimento_id: 1,
      veiculo_placa: 'ABC1234',
      veiculo_tipo: TipoVeiculoEnum.CARRO,
    });

    await destroyService.execute(entrada.id);

    expect(async () => destroyService.execute(entrada.id)).rejects.toThrowError(
      MessagesAPI.CONTROLE.DESTROY.BAD_REQUEST,
    );
  });
});
