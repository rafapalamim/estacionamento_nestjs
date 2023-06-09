import { Test, TestingModule } from '@nestjs/testing';
import { SQLiteModule } from 'src/database/modules/sqlite.module';
import { CreateVeiculoInput } from '../dto/create.dto';
import VeiculoCreateService from '../services/create.service';
import VeiculoUpdateService from '../services/update.service';
import VeiculoFindService from '../services/find.service';
import VeiculoDestroyService from '../services/destroy.service';
import VeiculoFindAllService from '../services/findAll.service';
import { veiculosProviders } from '../veiculos.providers';
import { MessagesAPI } from 'src/utils/messages.helper';
import { TipoVeiculoEnum } from 'src/modules/@base/enums/tipo.veiculo.enum';

describe('VeiculoServices', () => {
  let createService: VeiculoCreateService;
  let updateService: VeiculoUpdateService;
  let findService: VeiculoFindService;
  let findAllService: VeiculoFindAllService;
  let destroyService: VeiculoDestroyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SQLiteModule],
      providers: [...veiculosProviders],
    }).compile();

    createService = module.get<VeiculoCreateService>(VeiculoCreateService);

    updateService = module.get<VeiculoUpdateService>(VeiculoUpdateService);

    findService = module.get<VeiculoFindService>(VeiculoFindService);

    destroyService = module.get<VeiculoDestroyService>(VeiculoDestroyService);

    findAllService = module.get<VeiculoFindAllService>(VeiculoFindAllService);
  });

  it('Os serviços devem estar definidos', () => {
    expect(createService).toBeDefined();
    expect(updateService).toBeDefined();
    expect(findService).toBeDefined();
    expect(findAllService).toBeDefined();
  });

  it('Deve criar um registro', async () => {
    const input: CreateVeiculoInput = {
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Prata',
      placa: 'ABC1111',
      tipo: TipoVeiculoEnum.CARRO,
    };

    const created = await createService.execute(input);
    expect(created.id).toEqual(expect.any(Number));
  });

  it('Deve atualizar um registro', async () => {
    const createInput = {
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Prata',
      placa: 'ABC1234',
      tipo: TipoVeiculoEnum.CARRO,
    };

    const updateInput = {
      marca: 'Fiat',
      modelo: 'Toro',
      cor: 'Prata',
      placa: 'ABC1D34',
      tipo: TipoVeiculoEnum.CARRO,
    };

    const created = await createService.execute(createInput);

    const updated = await updateService.execute({
      ...updateInput,
      id: created.id,
    });

    expect(updated).toEqual({
      id: 1,
      marca: updated.marca,
      modelo: updated.modelo,
      cor: updated.cor,
      placa: updated.placa,
      tipo: updated.tipo,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      deleted_at: null,
    });
  });

  it('Deve criar um registro com o serviço de update', async () => {
    const updateInput = {
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Prata',
      placa: 'ABC1234',
      tipo: TipoVeiculoEnum.CARRO,
    };

    const updated = await updateService.execute(updateInput);

    expect(updated).toEqual({
      id: 1,
      marca: updateInput.marca,
      modelo: updateInput.modelo,
      cor: updateInput.cor,
      placa: updateInput.placa,
      tipo: updateInput.tipo,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      deleted_at: null,
    });
  });

  it('Deve encontrar um registro pelo ID', async () => {
    const createInput = {
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Prata',
      placa: 'ABC1234',
      tipo: TipoVeiculoEnum.CARRO,
    };

    const created = await createService.execute(createInput);

    const search = await findService.execute(created.id);

    expect(search).toEqual({
      id: 1,
      marca: createInput.marca,
      modelo: createInput.modelo,
      cor: createInput.cor,
      placa: createInput.placa,
      tipo: createInput.tipo,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      deleted_at: null,
    });
  });

  it('Deve lançar erro ao procurar um registro com ID inexistente', async () => {
    expect(async () => await findService.execute(1)).rejects.toThrowError(
      MessagesAPI.VEICULO.FIND.NOT_FOUND,
    );
  });

  it('Deve remover um registro', async () => {
    const createInput = {
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Prata',
      placa: 'ABC1234',
      tipo: TipoVeiculoEnum.CARRO,
    };

    const insert = await createService.execute(createInput);
    const deleted = await destroyService.execute(insert.id);
    expect(deleted).toBeUndefined();
  });

  it('Deve lançar erro ao tentar deletar um registro com id inexistente', async () => {
    expect(async () => await destroyService.execute(1)).rejects.toThrowError(
      MessagesAPI.VEICULO.DESTROY.NOT_FOUND,
    );
  });

  it('Deve encontrar registros sem informar nada em query params', async () => {
    await createService.execute({
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Prata',
      placa: 'ABC1111',
      tipo: TipoVeiculoEnum.CARRO,
    });

    await createService.execute({
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Prata',
      placa: 'ABC2222',
      tipo: TipoVeiculoEnum.CARRO,
    });

    const find = await findAllService.execute({});
    expect(find.data.length).toBe(2);
    expect(find.pagination).toEqual({
      total: expect.any(Number),
      paginaAtual: expect.any(Number),
      ultimaPagina: expect.any(Number),
    });
  });

  it('Não deve encontrar registros', async () => {
    expect(async () => await findAllService.execute({})).rejects.toThrowError(
      MessagesAPI.VEICULO.FIND_ALL.NOT_FOUND,
    );
  });

  it('Deve filtrar apenas um registro', async () => {
    await createService.execute({
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Prata',
      placa: 'ABC1234',
      tipo: TipoVeiculoEnum.CARRO,
    });

    await createService.execute({
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Prata',
      placa: 'DEF1234',
      tipo: TipoVeiculoEnum.CARRO,
    });

    const find = await findAllService.execute({ placa: 'DEF1234' });
    expect(find.data.length).toBe(1);
    expect(find.pagination).toEqual({
      total: expect.any(Number),
      paginaAtual: expect.any(Number),
      ultimaPagina: expect.any(Number),
    });
  });
});
