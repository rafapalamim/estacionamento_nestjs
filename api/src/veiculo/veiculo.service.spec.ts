import { Test, TestingModule } from '@nestjs/testing';
import { SQLiteModule } from 'src/database/modules/sqlite.module';
import { VeiculoService } from './veiculo.service';
import { veiculoProviders } from './veiculo.providers';
import { VeiculoCreateService } from './services/create';
import { VeiculoUpdateService } from './services/update';
import { VeiculoDeleteService } from './services/delete';
import { VeiculoFindOneService } from './services/find';
import { VeiculoFindAllService } from './services/findAll';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';

describe('VeiculoService', () => {
  let service: VeiculoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SQLiteModule],
      providers: [
        ...veiculoProviders,
        VeiculoService,
        VeiculoCreateService,
        VeiculoUpdateService,
        VeiculoDeleteService,
        VeiculoFindAllService,
        VeiculoFindOneService,
      ],
    }).compile();

    service = module.get<VeiculoService>(VeiculoService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um veículo', async () => {
    const input: CreateVeiculoDto = {
      modelo: 'Gol',
      marca: 'Volkswagen',
      placa: 'ABC1234',
      cor: 'Vermelho',
      tipo: 'Hatch',
    };

    const create = await service.create(input);

    expect(create).toEqual({
      id: expect.any(Number),
    });
  });

  it('deve atualizar um veículo', async () => {
    const input: CreateVeiculoDto = {
      modelo: 'Gol',
      marca: 'Volkswagen',
      placa: 'ABC1234',
      cor: 'Vermelho',
      tipo: 'Hatch',
    };

    await service.create(input);

    const update = await service.update(1, {
      ...input,
      modelo: 'Nivus',
    });

    expect(update.id).toEqual(1);
    expect(update.modelo).toEqual('Nivus');
  });

  it('deve procurar um veículo pelo ID', async () => {
    const input: CreateVeiculoDto = {
      modelo: 'Gol',
      marca: 'Volkswagen',
      placa: 'ABC1234',
      cor: 'Vermelho',
      tipo: 'Hatch',
    };

    await service.create(input);

    const find = await service.findOne(1);

    expect(find).toEqual({
      id: 1,
      modelo: 'Gol',
      marca: 'Volkswagen',
      placa: 'ABC1234',
      cor: 'Vermelho',
      tipo: 'Hatch',
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('deve procurar todos os veículos', async () => {
    const input: CreateVeiculoDto = {
      modelo: 'Gol',
      marca: 'Volkswagen',
      placa: 'ABC1234',
      cor: 'Vermelho',
      tipo: 'Hatch',
    };

    const input2: CreateVeiculoDto = {
      modelo: 'Nivus',
      marca: 'Volkswagen',
      placa: 'ABC1234',
      cor: 'Vermelho',
      tipo: 'Hatch',
    };

    const input3: CreateVeiculoDto = {
      modelo: 'Fox',
      marca: 'Volkswagen',
      placa: 'ABC1235',
      cor: 'Vermelho',
      tipo: 'Hatch',
    };

    await service.create(input);
    await service.create(input2);
    await service.create(input3);

    const findAll = await service.findAll({});
    expect(findAll.data.length).toEqual(3);
    expect(findAll.paginacao.paginaAtual).toBe(0);
    expect(findAll.paginacao.totalDeRegistros).toBe(3);
    expect(findAll.paginacao.ultimaPagina).toBe(0);

    const findAll2 = await service.findAll({ placa: 'ABC1235' });
    expect(findAll2.data.length).toEqual(1);
  });

  it('deve remover um veículo pelo ID', async () => {
    const input: CreateVeiculoDto = {
      modelo: 'Fox',
      marca: 'Volkswagen',
      placa: 'ABC1235',
      cor: 'Vermelho',
      tipo: 'Hatch',
    };

    await service.create(input);

    const deleted = await service.remove(1);
    expect(deleted).toBeUndefined();
  });
});
