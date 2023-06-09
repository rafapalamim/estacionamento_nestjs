import { Test, TestingModule } from '@nestjs/testing';
import { SQLiteModule } from 'src/database/modules/sqlite.module';
import { CreateEstabelecimentoInput } from '../dto/create.dto';
import { estabelecimentosProviders } from '../estabelecimentos.providers';
import EstabelecimentoCreateService from '../services/create.service';
import EstabelecimentoUpdateService from '../services/update.service';
import EstabelecimentoFindService from '../services/find.service';
import EstabelecimentoDestroyService from '../services/destroy.service';
import EstabelecimentoFindAllService from '../services/findAll.service';
import { MessagesAPI } from 'src/utils/messages.helper';

describe('EstabelecimentoServices', () => {
  let createService: EstabelecimentoCreateService;
  let updateService: EstabelecimentoUpdateService;
  let findService: EstabelecimentoFindService;
  let findAllService: EstabelecimentoFindAllService;
  let destroyService: EstabelecimentoDestroyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SQLiteModule],
      providers: [...estabelecimentosProviders],
    }).compile();

    createService = module.get<EstabelecimentoCreateService>(
      EstabelecimentoCreateService,
    );

    updateService = module.get<EstabelecimentoUpdateService>(
      EstabelecimentoUpdateService,
    );

    findService = module.get<EstabelecimentoFindService>(
      EstabelecimentoFindService,
    );

    destroyService = module.get<EstabelecimentoDestroyService>(
      EstabelecimentoDestroyService,
    );

    findAllService = module.get<EstabelecimentoFindAllService>(
      EstabelecimentoFindAllService,
    );
  });

  it('Os serviços devem estar definidos', () => {
    expect(createService).toBeDefined();
    expect(updateService).toBeDefined();
    expect(findService).toBeDefined();
    expect(findAllService).toBeDefined();
  });

  it('Deve criar um registro', async () => {
    const input: CreateEstabelecimentoInput = {
      nome: 'Empresa',
      cnpj: '12345678910',
      endereco: 'Rua X, 511',
      telefone: '551133334444',
      quantidade_vagas_carros: 5,
      quantidade_vagas_motos: 2,
    };

    const created = await createService.execute(input);
    expect(created.id).toEqual(expect.any(Number));
  });

  it('Deve atualizar um registro', async () => {
    const createInput = {
      nome: 'Empresa',
      cnpj: '12345678910',
      endereco: 'Rua X, 511',
      telefone: '551133334444',
      quantidade_vagas_carros: 10,
      quantidade_vagas_motos: 10,
    };

    const updateInput = {
      nome: 'Empresa 2',
      cnpj: '12345678912',
      endereco: 'Rua X, 522',
      telefone: '551133334442',
      quantidade_vagas_carros: 20,
      quantidade_vagas_motos: 20,
    };

    const created = await createService.execute(createInput);

    const updated = await updateService.execute({
      ...updateInput,
      id: created.id,
    });

    expect(updated).toEqual({
      id: 1,
      nome: updateInput.nome,
      cnpj: updateInput.cnpj,
      endereco: updateInput.endereco,
      telefone: updateInput.telefone,
      quantidade_vagas_carros: updateInput.quantidade_vagas_carros,
      quantidade_vagas_motos: updateInput.quantidade_vagas_motos,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      deleted_at: null,
    });
  });

  it('Deve criar um registro com o serviço de update', async () => {
    const updateInput = {
      nome: 'Empresa 2',
      cnpj: '12345678912',
      endereco: 'Rua X, 522',
      telefone: '551133334442',
      quantidade_vagas_carros: 20,
      quantidade_vagas_motos: 20,
    };

    const updated = await updateService.execute(updateInput);

    expect(updated).toEqual({
      id: 1,
      nome: updateInput.nome,
      cnpj: updateInput.cnpj,
      endereco: updateInput.endereco,
      telefone: updateInput.telefone,
      quantidade_vagas_carros: updateInput.quantidade_vagas_carros,
      quantidade_vagas_motos: updateInput.quantidade_vagas_motos,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      deleted_at: null,
    });
  });

  it('Deve encontrar um registro pelo ID', async () => {
    const createInput = {
      nome: 'Empresa',
      cnpj: '12345678910',
      endereco: 'Rua X, 511',
      telefone: '551133334444',
      quantidade_vagas_carros: 10,
      quantidade_vagas_motos: 10,
    };

    const created = await createService.execute(createInput);

    const search = await findService.execute(created.id);

    expect(search).toEqual({
      id: 1,
      nome: createInput.nome,
      cnpj: createInput.cnpj,
      endereco: createInput.endereco,
      telefone: createInput.telefone,
      quantidade_vagas_carros: createInput.quantidade_vagas_carros,
      quantidade_vagas_motos: createInput.quantidade_vagas_motos,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      deleted_at: null,
    });
  });

  it('Deve lançar erro ao procurar um registro com ID inexistente', async () => {
    expect(async () => await findService.execute(1)).rejects.toThrowError(
      MessagesAPI.ESTABELECIMENTO.FIND.NOT_FOUND,
    );
  });

  it('Deve remover um registro', async () => {
    const createInput = {
      nome: 'Empresa',
      cnpj: '12345678910',
      endereco: 'Rua X, 511',
      telefone: '551133334444',
      quantidade_vagas_carros: 10,
      quantidade_vagas_motos: 10,
    };

    const insert = await createService.execute(createInput);

    const deleted = await destroyService.execute(insert.id);

    expect(deleted).toBeUndefined();
  });

  it('Deve lançar erro ao tentar deletar um registro com id inexistente', async () => {
    expect(async () => await destroyService.execute(1)).rejects.toThrowError(
      MessagesAPI.ESTABELECIMENTO.DESTROY.NOT_FOUND,
    );
  });

  it('Deve encontrar registros sem informar nada em query params', async () => {
    await createService.execute({
      nome: 'Empresa',
      cnpj: '12345678910',
      endereco: 'Rua X, 511',
      telefone: '551133334444',
      quantidade_vagas_carros: 10,
      quantidade_vagas_motos: 10,
    });

    await createService.execute({
      nome: 'Empresa',
      cnpj: '12345678910',
      endereco: 'Rua X, 511',
      telefone: '551133334444',
      quantidade_vagas_carros: 20,
      quantidade_vagas_motos: 20,
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
    const findAll = await findAllService.execute({});
    expect(findAll.pagination.total).toBe(0);
    expect(findAll.data).toEqual([]);
  });

  it('Deve filtrar apenas um registro', async () => {
    await createService.execute({
      nome: 'Empresa 1',
      cnpj: '12345678910',
      endereco: 'Rua X, 511',
      telefone: '551133334444',
      quantidade_vagas_carros: 10,
      quantidade_vagas_motos: 10,
    });

    await createService.execute({
      nome: 'Empresa 2',
      cnpj: '12345678910',
      endereco: 'Rua X, 511',
      telefone: '551133334444',
      quantidade_vagas_carros: 20,
      quantidade_vagas_motos: 20,
    });

    const find = await findAllService.execute({ nome: 'Empresa 2' });
    expect(find.data.length).toBe(1);
    expect(find.pagination).toEqual({
      total: expect.any(Number),
      paginaAtual: expect.any(Number),
      ultimaPagina: expect.any(Number),
    });
  });
});
