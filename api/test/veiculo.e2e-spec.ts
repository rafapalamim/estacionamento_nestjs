import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { SQLiteModule } from 'src/database/modules/sqlite.module';
import * as request from 'supertest';
import { VeiculosController } from 'src/modules/veiculos/veiculos.controller';
import { veiculosProviders } from 'src/modules/veiculos/veiculos.providers';
import { FindVeiculoOutput } from 'src/modules/veiculos/dto/find.dto';
import { FindAllVeiculoOutput } from 'src/modules/veiculos/dto/findAll.dto';

describe('Veículo (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [SQLiteModule],
      controllers: [VeiculosController],
      providers: [...veiculosProviders],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/v1/veiculos (POST)', async () => {
    return request(app.getHttpServer())
      .post('/api/v1/veiculos')
      .send({
        modelo: 'Gol',
        marca: 'Volkswagen',
        placa: 'ABC1234',
        cor: 'Vermelho',
        tipo: 'Hatch',
      })
      .expect(HttpStatus.CREATED)
      .expect({
        id: 1,
      });
  });

  it('/api/v1/veiculos (POST) Deve retornar erro com algum campo inválido', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/veiculos')
      .send({
        modelo: '',
        marca: 'Volkswagen',
        placa: 'ABC1234',
        cor: 'Vermelho',
        tipo: 'Hatch',
      });

    const body: { statusCode: number; message: string[]; error: string } =
      response.body;

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    expect(body.message[0]).toBe('O modelo do veículo é um campo obrigatório');

    const response2 = await request(app.getHttpServer())
      .post('/api/v1/veiculos')
      .send({
        modelo: 'Gol',
        marca: 'Volkswagen',
        placa: '',
        cor: 'Vermelho',
        tipo: 'Hatch',
      });

    const body2: { statusCode: number; message: string[]; error: string } =
      response2.body;

    expect(response2.status).toBe(HttpStatus.BAD_REQUEST);
    expect(body2.message[0]).toBe('A placa do veículo é um campo obrigatório');

    const response3 = await request(app.getHttpServer())
      .post('/api/v1/veiculos')
      .send({
        modelo: 'Gol',
        marca: 'Volkswagen',
        placa: 'ABC1234',
        cor: 'Vermelho',
        tipo: '',
      });

    const body3: { statusCode: number; message: string[]; error: string } =
      response3.body;

    expect(response3.status).toBe(HttpStatus.BAD_REQUEST);
    expect(body3.message[0]).toBe('O tipo do veículo é um campo obrigatório');
  });

  it('/api/v1/veiculos (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/veiculos');

    expect(response.status).toBe(HttpStatus.OK);

    const body: FindAllVeiculoOutput = response.body;

    expect(body.data.length).toBe(1);
    expect(body.data[0].id).toEqual(1);
    expect(body.data[0].modelo).toEqual('Gol');
  });

  it('/api/v1/veiculos (GET) Deve retornar erro ao não encontrar veículos com a busca fornecida (placa=ABC1111)', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/v1/veiculos?placa=ABC1111',
    );

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });

  it('/api/v1/veiculos/:id (GET)', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/v1/veiculos/1',
    );

    expect(response.status).toBe(HttpStatus.OK);

    const body: FindVeiculoOutput = response.body;
    expect(body.id).toEqual(1);
    expect(body.modelo).toEqual('Gol');
  });

  it('/api/v1/veiculos/:id (GET) Deve retornar erro com id não existente', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/v1/veiculos/2',
    );

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });

  // it('/api/v1/veiculos/:id (PATCH)', async () => {
  //   const response = await request(app.getHttpServer())
  //     .patch('/api/v1/veiculos/1')
  //     .send({
  //       modelo: 'Gol 2',
  //       marca: 'Volkswagen',
  //       placa: 'ABC1234',
  //       cor: 'Vermelho',
  //       tipo: 'Hatch',
  //     });

  //   expect(response.status).toBe(HttpStatus.OK);

  //   const body: FindVeiculoOutputDto = response.body;
  //   expect(body.id).toEqual(1);
  //   expect(body.modelo).toEqual('Gol 2');
  // });

  // it('/api/v1/veiculos/:id (PATCH) Deve conseguir atualizar parcialmente os dados', async () => {
  //   const response = await request(app.getHttpServer())
  //     .patch('/api/v1/veiculos/1')
  //     .send({
  //       cor: 'Azul',
  //       tipo: 'Esportivo',
  //     });

  //   expect(response.status).toBe(HttpStatus.OK);

  //   const body: FindVeiculoOutputDto = response.body;
  //   expect(body.id).toEqual(1);
  //   expect(body.cor).toEqual('Azul');
  //   expect(body.tipo).toEqual('Esportivo');
  // });

  // it('/api/v1/veiculos/:id (PATCH) Deve retornar erro ao atualizar com dados inválidos', async () => {
  //   const response = await request(app.getHttpServer())
  //     .patch('/api/v1/veiculos/1')
  //     .send({
  //       cor: '',
  //       tipo: 'Esportivo',
  //     });

  //   expect(response.status).toBe(HttpStatus.BAD_REQUEST);

  //   const response2 = await request(app.getHttpServer())
  //     .patch('/api/v1/veiculos/1')
  //     .send({
  //       cor: 'Azul',
  //       tipo: '',
  //     });

  //   expect(response2.status).toBe(HttpStatus.BAD_REQUEST);
  // });

  // it('/api/v1/veiculos/:id (PATCH) Deve retornar erro com id não existente', async () => {
  //   const response = await request(app.getHttpServer())
  //     .patch('/api/v1/veiculos/2')
  //     .send({
  //       modelo: 'Gol 2',
  //       marca: 'Volkswagen',
  //       placa: 'ABC1234',
  //       cor: 'Vermelho',
  //       tipo: 'Hatch',
  //     });

  //   expect(response.status).toBe(HttpStatus.NOT_FOUND);
  // });

  it('/api/v1/veiculos/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer()).delete(
      '/api/v1/veiculos/1',
    );

    expect(response.status).toBe(HttpStatus.NO_CONTENT);
  });

  it('/api/v1/veiculos/:id (DELETE) Deve retornar erro com id não existente', async () => {
    const response = await request(app.getHttpServer()).delete(
      '/api/v1/veiculos/2',
    );

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });
});
