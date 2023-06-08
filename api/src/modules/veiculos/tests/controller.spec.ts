import { Test, TestingModule } from '@nestjs/testing';
import { SQLiteModule } from 'src/database/modules/sqlite.module';
import { VeiculosController } from '../veiculos.controller';
import { veiculosProviders } from '../veiculos.providers';
import { MessagesAPI } from 'src/utils/messages.helper';

describe('VeiculoController', () => {
  let controller: VeiculosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SQLiteModule],
      controllers: [VeiculosController],
      providers: [...veiculosProviders],
    }).compile();

    controller = module.get<VeiculosController>(VeiculosController);
  });

  it('Controller definido', () => {
    expect(controller).toBeDefined();
  });

  it('Deve executar método create', async () => {
    const create = await controller.create({
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Prata',
      placa: 'ABC1234',
      tipo: 'Hatch',
    });
    expect(create).toEqual({
      id: expect.any(Number),
    });
  });

  it('Deve executar método update', async () => {
    await controller.create({
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Prata',
      placa: 'ABC1234',
      tipo: 'Hatch',
    });

    const updated = await controller.update({
      id: 1,
      marca: 'Fiat',
      modelo: 'Toro',
      cor: 'Vermelho',
      placa: 'DEF4567',
      tipo: 'Picape',
    });

    expect(updated.id).toBe(1);
    expect(updated).toEqual({
      id: expect.any(Number),
      marca: expect.any(String),
      modelo: 'Toro',
      cor: expect.any(String),
      placa: expect.any(String),
      tipo: expect.any(String),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      deleted_at: null,
    });
  });

  it('Deve criar um novo registro mesmo utilizando o método update', async () => {
    const inputUpdate = {
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Prata',
      placa: 'ABC1234',
      tipo: 'Hatch',
    };

    const updated = await controller.update(inputUpdate);

    expect(updated.id).toBe(1);
    expect(updated.marca).toBe('Fiat');
    expect(updated.modelo).toBe('Palio');
    expect(updated.cor).toBe('Prata');
    expect(updated.placa).toBe('ABC1234');
    expect(updated.tipo).toBe('Hatch');
  });

  it('Não deve criar um novo registro utilizando o método update sendo que o ID não existe', async () => {
    const inputUpdate = {
      id: 10,
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Prata',
      placa: 'ABC1234',
      tipo: 'Hatch',
    };

    expect(
      async () => await controller.update(inputUpdate),
    ).rejects.toThrowError(MessagesAPI.VEICULO.UPDATE.NOT_FOUND);
  });

  it('Deve encontrar um registro pelo ID', async () => {
    await controller.create({
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Prata',
      placa: 'ABC1234',
      tipo: 'Hatch',
    });

    const find = await controller.find(1);

    expect(find).toEqual({
      id: expect.any(Number),
      marca: expect.any(String),
      modelo: expect.any(String),
      cor: expect.any(String),
      placa: expect.any(String),
      tipo: expect.any(String),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      deleted_at: null,
    });
  });

  it('Não deve encontrar um registro pelo ID', async () => {
    expect(async () => await controller.find(1)).rejects.toThrowError(
      MessagesAPI.VEICULO.FIND.NOT_FOUND,
    );
  });

  it('Deve fazer uma busca com todos os registros', async () => {
    await controller.create({
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Prata',
      placa: 'ABC1234',
      tipo: 'Hatch',
    });

    await controller.create({
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Prata',
      placa: 'ABC1234',
      tipo: 'Hatch',
    });

    await controller.create({
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Prata',
      placa: 'ABC1234',
      tipo: 'Hatch',
    });

    const findAll = await controller.findAll({});

    expect(findAll.data.length).toBe(3);
    expect(findAll.data[0]).toEqual({
      id: expect.any(Number),
      marca: expect.any(String),
      modelo: expect.any(String),
      cor: expect.any(String),
      placa: expect.any(String),
      tipo: expect.any(String),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      deleted_at: null,
    });
    expect(findAll.data[1]).toEqual({
      id: expect.any(Number),
      marca: expect.any(String),
      modelo: expect.any(String),
      cor: expect.any(String),
      placa: expect.any(String),
      tipo: expect.any(String),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      deleted_at: null,
    });
    expect(findAll.data[2]).toEqual({
      id: expect.any(Number),
      marca: expect.any(String),
      modelo: expect.any(String),
      cor: expect.any(String),
      placa: expect.any(String),
      tipo: expect.any(String),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      deleted_at: null,
    });
    expect(findAll.pagination.total).toBe(3);
    expect(findAll.pagination.paginaAtual).toBe(0);
    expect(findAll.pagination.ultimaPagina).toBe(0);
  });

  it('Deve fazer uma busca com todos os registros e encontrar apenas 1', async () => {
    await controller.create({
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Prata',
      placa: 'ABC1234',
      tipo: 'Hatch',
    });

    await controller.create({
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Azul',
      placa: 'ABC1234',
      tipo: 'Hatch',
    });

    await controller.create({
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Vermelho',
      placa: 'ABC1234',
      tipo: 'Hatch',
    });

    const findAll = await controller.findAll({ cor: 'Vermelho' });

    expect(findAll.data.length).toBe(1);
    expect(findAll.data[0].cor).toBe('Vermelho');
    expect(findAll.pagination.total).toBe(1);
    expect(findAll.pagination.paginaAtual).toBe(0);
    expect(findAll.pagination.ultimaPagina).toBe(0);
  });

  it('Deve fazer uma busca com todos os registros e encontrar todos do mesmo modelo', async () => {
    await controller.create({
      marca: 'Fiat',
      modelo: 'Palio',
      cor: 'Vermelho',
      placa: 'ABC1234',
      tipo: 'Hatch',
    });

    await controller.create({
      marca: 'Fiat',
      modelo: 'Toro',
      cor: 'Vermelho',
      placa: 'ABC1234',
      tipo: 'Hatch',
    });

    await controller.create({
      marca: 'Fiat',
      modelo: 'Toro',
      cor: 'Azul',
      placa: 'ABC1234',
      tipo: 'Hatch',
    });

    const findAll = await controller.findAll({ modelo: 'Toro' });

    expect(findAll.data.length).toBe(2);
    expect(findAll.pagination.total).toBe(2);
    expect(findAll.pagination.paginaAtual).toBe(0);
    expect(findAll.pagination.ultimaPagina).toBe(0);
  });

  it('Não deve encontrar registros de acordo com a busca feita', async () => {
    await controller.create({
      marca: 'Fiat',
      modelo: 'Toro',
      cor: 'Azul',
      placa: 'ABC1234',
      tipo: 'Hatch',
    });

    await controller.create({
      marca: 'Fiat',
      modelo: 'Toro',
      cor: 'Azul',
      placa: 'ABC1234',
      tipo: 'Hatch',
    });

    await controller.create({
      marca: 'Fiat',
      modelo: 'Toro',
      cor: 'Azul',
      placa: 'ABC1234',
      tipo: 'Hatch',
    });

    expect(
      async () => await controller.findAll({ modelo: 'Gol' }),
    ).rejects.toThrowError(MessagesAPI.VEICULO.FIND_ALL.NOT_FOUND);
  });

  it('Deve remover um registro', async () => {
    await controller.create({
      marca: 'Fiat',
      modelo: 'Toro',
      cor: 'Azul',
      placa: 'ABC1234',
      tipo: 'Hatch',
    });

    const deleted = await controller.destroy(1);

    expect(deleted).toBeUndefined();
  });

  it('Não deve remover um registro com id não existente', async () => {
    expect(async () => await controller.destroy(10)).rejects.toThrowError(
      MessagesAPI.VEICULO.DESTROY.NOT_FOUND,
    );
  });
});
