import { Test, TestingModule } from '@nestjs/testing';
import { EstabelecimentoService } from './estabelecimento.service';
import { estabelecimentoProviders } from './estabelecimento.providers';
import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { SQLiteModule } from 'src/database/modules/sqlite.module';

describe('EstabelecimentoService', () => {
  let service: EstabelecimentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SQLiteModule],
      providers: [...estabelecimentoProviders, EstabelecimentoService],
    }).compile();

    service = module.get<EstabelecimentoService>(EstabelecimentoService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um estabelecimento', async () => {
    const input: CreateEstabelecimentoDto = {
      nome: 'John Doe',
      cnpj: '123456',
      endereco: 'Avenida',
      telefone: '5511912345678',
      quantidade_vagas_carros: 5,
      quantidade_vagas_motos: 3,
    };

    const create = await service.create(input);

    expect(create).toEqual({
      id: expect.any(Number),
    });
  });

  it('deve atualizar um estabelecimento', async () => {
    const input: CreateEstabelecimentoDto = {
      nome: 'John Doe',
      cnpj: '123456',
      endereco: 'Avenida',
      telefone: '5511912345678',
      quantidade_vagas_carros: 5,
      quantidade_vagas_motos: 3,
    };

    await service.create(input);

    const update = await service.update(1, {
      ...input,
      nome: 'John Doe 2',
      cnpj: '14',
    });

    expect(update.id).toEqual(1);
    expect(update.nome).toEqual('John Doe 2');
    expect(update.cnpj).toEqual('14');
  });

  it('deve procurar um estabelecimento pelo ID', async () => {
    const input: CreateEstabelecimentoDto = {
      nome: 'John Doe',
      cnpj: '123456',
      endereco: 'Avenida',
      telefone: '5511912345678',
      quantidade_vagas_carros: 5,
      quantidade_vagas_motos: 3,
    };

    await service.create(input);

    const find = await service.findOne(1);

    expect(find).toEqual({
      id: 1,
      nome: 'John Doe',
      cnpj: '123456',
      endereco: 'Avenida',
      telefone: '5511912345678',
      quantidade_vagas_carros: 5,
      quantidade_vagas_motos: 3,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('deve procurar todos os estabelecimentos', async () => {
    const input: CreateEstabelecimentoDto = {
      nome: 'John Doe',
      cnpj: '123456',
      endereco: 'Avenida',
      telefone: '5511912345678',
      quantidade_vagas_carros: 5,
      quantidade_vagas_motos: 3,
    };

    const input2: CreateEstabelecimentoDto = {
      nome: 'John Doe',
      cnpj: '1234567',
      endereco: 'Avenida',
      telefone: '5511912345678',
      quantidade_vagas_carros: 5,
      quantidade_vagas_motos: 3,
    };

    const input3: CreateEstabelecimentoDto = {
      nome: 'John Doe',
      cnpj: '1234567',
      endereco: 'Avenida',
      telefone: '5511912345678',
      quantidade_vagas_carros: 5,
      quantidade_vagas_motos: 3,
    };

    await service.create(input);
    await service.create(input2);
    await service.create(input3);

    const findAll = await service.findAll({});
    expect(findAll.length).toEqual(3);

    const findAll2 = await service.findAll({ cnpj: '1234567' });
    expect(findAll2.length).toEqual(2);
  });

  it('deve remover um estabelecimento pelo ID', async () => {
    const input: CreateEstabelecimentoDto = {
      nome: 'John Doe',
      cnpj: '123456',
      endereco: 'Avenida',
      telefone: '5511912345678',
      quantidade_vagas_carros: 5,
      quantidade_vagas_motos: 3,
    };

    await service.create(input);

    const deleted = await service.remove(1);
    expect(deleted).toBeUndefined();
  });
});
