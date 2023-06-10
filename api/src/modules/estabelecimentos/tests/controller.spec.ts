import { Test, TestingModule } from '@nestjs/testing';
import { SQLiteModule } from 'src/database/modules/sqlite.module';
import { EstabelecimentosController } from '../estabelecimentos.controller';
import { estabelecimentosProviders } from '../estabelecimentos.providers';
import { CreateEstabelecimentoInput } from '../dto/create.dto';
import { MessagesAPI } from 'src/utils/messages.helper';

describe('EstabelecimentoController', () => {
  let controller: EstabelecimentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SQLiteModule],
      controllers: [EstabelecimentosController],
      providers: [...estabelecimentosProviders],
    }).compile();

    controller = module.get<EstabelecimentosController>(
      EstabelecimentosController,
    );
  });

  it('Controller definido', () => {
    expect(controller).toBeDefined();
  });

  it('Deve executar método create', async () => {
    const input: CreateEstabelecimentoInput = {
      nome: 'Teste',
      cnpj: '12345678910000',
      endereco: 'Avenida X, 555',
      quantidade_vagas_carros: 15,
      quantidade_vagas_motos: 10,
      telefone: '551133334444',
    };

    const create = await controller.create(input);
    expect(create).toEqual({
      id: expect.any(Number),
    });
  });

  it('Deve executar método update', async () => {
    await controller.create({
      nome: 'Teste',
      cnpj: '12345678910000',
      endereco: 'Avenida X, 555',
      quantidade_vagas_carros: 15,
      quantidade_vagas_motos: 10,
      telefone: '551133334444',
    });

    const inputUpdate = {
      id: 1,
      nome: 'Novo nome',
      cnpj: '12345678911111',
      endereco: 'Avenida X, 555',
      quantidade_vagas_carros: 20,
      quantidade_vagas_motos: 20,
      telefone: '551133334444',
    };

    const updated = await controller.update(inputUpdate);

    expect(updated.id).toBe(1);
    expect(updated).toEqual({
      id: expect.any(Number),
      nome: expect.any(String),
      telefone: expect.any(String),
      endereco: expect.any(String),
      cnpj: expect.any(String),
      quantidade_vagas_motos: expect.any(Number),
      quantidade_vagas_carros: expect.any(Number),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      deleted_at: null,
    });
    expect(updated.quantidade_vagas_carros).toBe(20);
    expect(updated.quantidade_vagas_motos).toBe(20);
  });

  it('Deve criar um novo registro mesmo utilizando o método update', async () => {
    const inputUpdate = {
      nome: 'Novo nome',
      cnpj: '12345678911111',
      endereco: 'Avenida X, 555',
      quantidade_vagas_carros: 20,
      quantidade_vagas_motos: 20,
      telefone: '551133334444',
    };

    const updated = await controller.update(inputUpdate);

    expect(updated.id).toBe(1);
    expect(updated.nome).toBe('Novo nome');
    expect(updated.cnpj).toBe('12345678911111');
    expect(updated.endereco).toBe('Avenida X, 555');
    expect(updated.telefone).toBe('551133334444');
    expect(updated.quantidade_vagas_carros).toBe(20);
    expect(updated.quantidade_vagas_motos).toBe(20);
  });

  it('Não deve criar um novo registro utilizando o método update sendo que o ID não existe', async () => {
    const inputUpdate = {
      id: 10,
      nome: 'Novo nome',
      cnpj: '12345678911111',
      endereco: 'Avenida X, 555',
      quantidade_vagas_carros: 20,
      quantidade_vagas_motos: 20,
      telefone: '551133334444',
    };

    expect(
      async () => await controller.update(inputUpdate),
    ).rejects.toThrowError(MessagesAPI.ESTABELECIMENTO.UPDATE.NOT_FOUND);
  });

  it('Deve encontrar um registro pelo ID', async () => {
    await controller.create({
      nome: 'Teste',
      cnpj: '12345678910000',
      endereco: 'Avenida X, 555',
      quantidade_vagas_carros: 15,
      quantidade_vagas_motos: 10,
      telefone: '551133334444',
    });

    const find = await controller.find(1);

    expect(find).toEqual({
      id: expect.any(Number),
      nome: expect.any(String),
      telefone: expect.any(String),
      endereco: expect.any(String),
      cnpj: expect.any(String),
      quantidade_vagas_motos: expect.any(Number),
      quantidade_vagas_carros: expect.any(Number),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      deleted_at: null,
    });
  });

  it('Não deve encontrar um registro pelo ID', async () => {
    expect(async () => await controller.find(1)).rejects.toThrowError(
      MessagesAPI.ESTABELECIMENTO.FIND.NOT_FOUND,
    );
  });

  it('Deve fazer uma busca com todos os registros', async () => {
    await controller.create({
      nome: 'Teste 1',
      cnpj: '12345678910000',
      endereco: 'Avenida X, 555',
      quantidade_vagas_carros: 15,
      quantidade_vagas_motos: 10,
      telefone: '551133334444',
    });

    await controller.create({
      nome: 'Teste 2',
      cnpj: '12345678910000',
      endereco: 'Avenida X, 555',
      quantidade_vagas_carros: 15,
      quantidade_vagas_motos: 10,
      telefone: '551133334444',
    });

    await controller.create({
      nome: 'Teste 3',
      cnpj: '12345678910000',
      endereco: 'Avenida X, 555',
      quantidade_vagas_carros: 15,
      quantidade_vagas_motos: 10,
      telefone: '551133334444',
    });

    const findAll = await controller.findAll({});

    expect(findAll.data.length).toBe(3);
    expect(findAll.data[0]).toEqual({
      id: expect.any(Number),
      nome: expect.any(String),
      telefone: expect.any(String),
      endereco: expect.any(String),
      cnpj: expect.any(String),
      quantidade_vagas_motos: expect.any(Number),
      quantidade_vagas_carros: expect.any(Number),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      deleted_at: null,
    });
    expect(findAll.data[1]).toEqual({
      id: expect.any(Number),
      nome: expect.any(String),
      telefone: expect.any(String),
      endereco: expect.any(String),
      cnpj: expect.any(String),
      quantidade_vagas_motos: expect.any(Number),
      quantidade_vagas_carros: expect.any(Number),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      deleted_at: null,
    });
    expect(findAll.data[2]).toEqual({
      id: expect.any(Number),
      nome: expect.any(String),
      telefone: expect.any(String),
      endereco: expect.any(String),
      cnpj: expect.any(String),
      quantidade_vagas_motos: expect.any(Number),
      quantidade_vagas_carros: expect.any(Number),
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
      nome: 'Teste 1',
      cnpj: '12345678910000',
      endereco: 'Avenida X, 555',
      quantidade_vagas_carros: 15,
      quantidade_vagas_motos: 10,
      telefone: '551133334444',
    });

    await controller.create({
      nome: 'Teste 2',
      cnpj: '12345678910000',
      endereco: 'Avenida X, 555',
      quantidade_vagas_carros: 15,
      quantidade_vagas_motos: 10,
      telefone: '551133334444',
    });

    await controller.create({
      nome: 'Teste 3',
      cnpj: '12345678910000',
      endereco: 'Avenida X, 555',
      quantidade_vagas_carros: 15,
      quantidade_vagas_motos: 10,
      telefone: '551133334444',
    });

    const findAll = await controller.findAll({ nome: 'Teste 1' });

    expect(findAll.data.length).toBe(1);
    expect(findAll.data[0].nome).toBe('Teste 1');
    expect(findAll.pagination.total).toBe(1);
    expect(findAll.pagination.paginaAtual).toBe(0);
    expect(findAll.pagination.ultimaPagina).toBe(0);
  });

  it('Deve fazer uma busca com todos os registros e encontrar todos com o mesmo cnpj', async () => {
    await controller.create({
      nome: 'Teste 1',
      cnpj: '12345678910001',
      endereco: 'Avenida X, 555',
      quantidade_vagas_carros: 15,
      quantidade_vagas_motos: 10,
      telefone: '551133334444',
    });

    await controller.create({
      nome: 'Teste 2',
      cnpj: '12345678910000',
      endereco: 'Avenida X, 555',
      quantidade_vagas_carros: 15,
      quantidade_vagas_motos: 10,
      telefone: '551133334444',
    });

    await controller.create({
      nome: 'Teste 3',
      cnpj: '12345678910000',
      endereco: 'Avenida X, 555',
      quantidade_vagas_carros: 15,
      quantidade_vagas_motos: 10,
      telefone: '551133334444',
    });

    const findAll = await controller.findAll({ cnpj: '12345678910000' });

    expect(findAll.data.length).toBe(2);
    expect(findAll.pagination.total).toBe(2);
    expect(findAll.pagination.paginaAtual).toBe(0);
    expect(findAll.pagination.ultimaPagina).toBe(0);
  });

  it('Não deve encontrar registros de acordo com a busca feita', async () => {
    await controller.create({
      nome: 'Teste 1',
      cnpj: '12345678910001',
      endereco: 'Avenida X, 555',
      quantidade_vagas_carros: 15,
      quantidade_vagas_motos: 10,
      telefone: '551133334444',
    });

    await controller.create({
      nome: 'Teste 2',
      cnpj: '12345678910000',
      endereco: 'Avenida X, 555',
      quantidade_vagas_carros: 15,
      quantidade_vagas_motos: 10,
      telefone: '551133334444',
    });

    await controller.create({
      nome: 'Teste 3',
      cnpj: '12345678910000',
      endereco: 'Avenida X, 555',
      quantidade_vagas_carros: 15,
      quantidade_vagas_motos: 10,
      telefone: '551133334444',
    });

    const findAll = await controller.findAll({ cnpj: '111' });

    expect(findAll.pagination.total).toBe(0);
    expect(findAll.data).toEqual([]);
  });

  it('Deve remover um registro', async () => {
    await controller.create({
      nome: 'Teste',
      cnpj: '12345678910000',
      endereco: 'Avenida X, 555',
      quantidade_vagas_carros: 15,
      quantidade_vagas_motos: 10,
      telefone: '551133334444',
    });

    const deleted = await controller.destroy(1);

    expect(deleted).toBeUndefined();
  });

  it('Não deve remover um registro com id não existente', async () => {
    expect(async () => await controller.destroy(10)).rejects.toThrowError(
      MessagesAPI.ESTABELECIMENTO.DESTROY.NOT_FOUND,
    );
  });
});
