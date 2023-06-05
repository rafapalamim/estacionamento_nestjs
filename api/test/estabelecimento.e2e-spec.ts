import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { EstabelecimentoController } from 'src/estabelecimento/estabelecimento.controller';
import { estabelecimentoProviders } from 'src/estabelecimento/estabelecimento.providers';
import { EstabelecimentoService } from 'src/estabelecimento/estabelecimento.service';
import { SQLiteModule } from 'src/database/modules/sqlite.module';
import * as request from 'supertest';
import { FindEstabelecimentoOutputDto } from 'src/estabelecimento/dto/find-estabelecimento.dto';

// const populate = async (
//   appControler: EstabelecimentoController,
// ): Promise<void> => {
//   await appControler.create({
//     nome: 'John Inc ' + Date.now(),
//     cnpj: '12345',
//     endereco: 'Avenida',
//     telefone: '551112345678',
//     quantidade_vagas_carros: 5,
//     quantidade_vagas_motos: 1,
//   });
// };

describe('Estabelecimento (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [SQLiteModule],
      controllers: [EstabelecimentoController],
      providers: [...estabelecimentoProviders, EstabelecimentoService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/estabelecimento (POST)', async () => {
    return request(app.getHttpServer())
      .post('/estabelecimento')
      .send({
        nome: 'John Inc',
        cnpj: '12345',
        endereco: 'Avenida',
        telefone: '551112345678',
        quantidade_vagas_carros: 5,
        quantidade_vagas_motos: 0,
      })
      .expect(HttpStatus.CREATED)
      .expect({
        id: 1,
      });
  });

  it('/estabelecimento (POST) Deve retornar erro com algum campo inválido', async () => {
    const response = await request(app.getHttpServer())
      .post('/estabelecimento')
      .send({
        nome: '',
        cnpj: '12345',
        endereco: 'Avenida',
        telefone: '551112345678',
        quantidade_vagas_carros: 5,
        quantidade_vagas_motos: 1,
      });

    const body: { statusCode: number; message: string[]; error: string } =
      response.body;

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    expect(body.message[0]).toBe('O nome é um campo obrigatório');

    const response2 = await request(app.getHttpServer())
      .post('/estabelecimento')
      .send({
        nome: 'Teste',
        cnpj: '12345',
        endereco: 'Avenida',
        telefone: '551112345678',
        quantidade_vagas_carros: -1,
        quantidade_vagas_motos: 1,
      });

    const body2: { statusCode: number; message: string[]; error: string } =
      response2.body;

    expect(response2.status).toBe(HttpStatus.BAD_REQUEST);
    expect(body2.message[0]).toBe(
      'A quantidade de vagas para carros deve ser igual ou maior que zero',
    );

    const response3 = await request(app.getHttpServer())
      .post('/estabelecimento')
      .send({
        cnpj: '12345',
        endereco: 'Avenida',
        telefone: '551112345678',
        quantidade_vagas_carros: 0,
        quantidade_vagas_motos: 1,
      });

    const body3: { statusCode: number; message: string[]; error: string } =
      response3.body;

    expect(response3.status).toBe(HttpStatus.BAD_REQUEST);
    expect(body3.message[0]).toBe('O nome é um campo obrigatório');
  });

  it('/estabelecimento (GET)', async () => {
    // const appController = app.get(EstabelecimentoController);
    // await populate(appController);

    const response = await request(app.getHttpServer()).get('/estabelecimento');

    expect(response.status).toBe(HttpStatus.OK);

    const body: FindEstabelecimentoOutputDto[] = response.body;

    expect(body.length).toBe(1);
    expect(body[0].id).toEqual(1);
    expect(body[0].nome).toEqual('John Inc');
  });

  it('/estabelecimento (GET) Deve retornar erro ao não encontrar estabelecimentos com a busca fornecida (cnpj=111)', async () => {
    const response = await request(app.getHttpServer()).get(
      '/estabelecimento?cnpj=111',
    );

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });

  it('/estabelecimento/:id (GET)', async () => {
    const response = await request(app.getHttpServer()).get(
      '/estabelecimento/1',
    );

    expect(response.status).toBe(HttpStatus.OK);

    const body: FindEstabelecimentoOutputDto = response.body;
    expect(body.id).toEqual(1);
    expect(body.nome).toEqual('John Inc');
  });

  it('/estabelecimento/:id (GET) Deve retornar erro com id não existente', async () => {
    const response = await request(app.getHttpServer()).get(
      '/estabelecimento/2',
    );

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });

  it('/estabelecimento/:id (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch('/estabelecimento/1')
      .send({
        nome: 'John Inc 2',
        cnpj: '12345',
        endereco: 'Avenida',
        telefone: '551112345678',
        quantidade_vagas_carros: 5,
        quantidade_vagas_motos: 1,
      });

    expect(response.status).toBe(HttpStatus.OK);

    const body: FindEstabelecimentoOutputDto = response.body;
    expect(body.id).toEqual(1);
    expect(body.nome).toEqual('John Inc 2');
  });

  it('/estabelecimento/:id (PATCH) Deve conseguir atualizar parcialmente os dados', async () => {
    const response = await request(app.getHttpServer())
      .patch('/estabelecimento/1')
      .send({
        quantidade_vagas_carros: 50,
        quantidade_vagas_motos: 10,
      });

    expect(response.status).toBe(HttpStatus.OK);

    const body: FindEstabelecimentoOutputDto = response.body;
    expect(body.id).toEqual(1);
    expect(body.quantidade_vagas_carros).toEqual(50);
    expect(body.quantidade_vagas_motos).toEqual(10);
  });

  it('/estabelecimento/:id (PATCH) Deve retornar erro ao atualizar com dados inválidos', async () => {
    const response = await request(app.getHttpServer())
      .patch('/estabelecimento/1')
      .send({
        quantidade_vagas_carros: -1,
        quantidade_vagas_motos: 10,
      });

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);

    const response2 = await request(app.getHttpServer())
      .patch('/estabelecimento/1')
      .send({
        nome: '',
        quantidade_vagas_carros: 10,
        quantidade_vagas_motos: 10,
      });

    expect(response2.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it('/estabelecimento/:id (PATCH) Deve retornar erro com id não existente', async () => {
    const response = await request(app.getHttpServer())
      .patch('/estabelecimento/2')
      .send({
        nome: 'John Inc 2',
        cnpj: '12345',
        endereco: 'Avenida',
        telefone: '551112345678',
        quantidade_vagas_carros: 5,
        quantidade_vagas_motos: 1,
      });

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });

  it('/estabelecimento/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer()).delete(
      '/estabelecimento/1',
    );

    expect(response.status).toBe(HttpStatus.NO_CONTENT);
  });

  it('/estabelecimento/:id (DELETE) Deve retornar erro com id não existente', async () => {
    const response = await request(app.getHttpServer()).delete(
      '/estabelecimento/2',
    );

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });
});
