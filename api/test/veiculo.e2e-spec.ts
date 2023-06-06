import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { SQLiteModule } from 'src/database/modules/sqlite.module';
import * as request from 'supertest';
import { VeiculoController } from 'src/veiculo/veiculo.controller';
import { VeiculoService } from 'src/veiculo/veiculo.service';
import { VeiculoCreateService } from 'src/veiculo/services/create';
import { VeiculoUpdateService } from 'src/veiculo/services/update';
import { VeiculoDeleteService } from 'src/veiculo/services/delete';
import { VeiculoFindAllService } from 'src/veiculo/services/findAll';
import { VeiculoFindOneService } from 'src/veiculo/services/find';
import { veiculoProviders } from 'src/veiculo/veiculo.providers';
import { FindAllVeiculosOutputDto } from 'src/veiculo/dto/find-all-veiculos.dto';
import { FindVeiculoOutputDto } from 'src/veiculo/dto/find-veiculo.dto';

describe('Veículo (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [SQLiteModule],
      controllers: [VeiculoController],
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

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/v1/veiculo (POST)', async () => {
    return request(app.getHttpServer())
      .post('/api/v1/veiculo')
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

  it('/api/v1/veiculo (POST) Deve retornar erro com algum campo inválido', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/veiculo')
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
      .post('/api/v1/veiculo')
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
      .post('/api/v1/veiculo')
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

  it('/api/v1/veiculo (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/veiculo');

    expect(response.status).toBe(HttpStatus.OK);

    const body: FindAllVeiculosOutputDto = response.body;

    expect(body.data.length).toBe(1);
    expect(body.data[0].id).toEqual(1);
    expect(body.data[0].modelo).toEqual('Gol');
  });

  it('/api/v1/veiculo (GET) Deve retornar erro ao não encontrar veículos com a busca fornecida (placa=ABC1111)', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/v1/veiculo?placa=ABC1111',
    );

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });

  it('/api/v1/veiculo/:id (GET)', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/v1/veiculo/1',
    );

    expect(response.status).toBe(HttpStatus.OK);

    const body: FindVeiculoOutputDto = response.body;
    expect(body.id).toEqual(1);
    expect(body.modelo).toEqual('Gol');
  });

  it('/api/v1/veiculo/:id (GET) Deve retornar erro com id não existente', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/v1/veiculo/2',
    );

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });

  it('/api/v1/veiculo/:id (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch('/api/v1/veiculo/1')
      .send({
        modelo: 'Gol 2',
        marca: 'Volkswagen',
        placa: 'ABC1234',
        cor: 'Vermelho',
        tipo: 'Hatch',
      });

    expect(response.status).toBe(HttpStatus.OK);

    const body: FindVeiculoOutputDto = response.body;
    expect(body.id).toEqual(1);
    expect(body.modelo).toEqual('Gol 2');
  });

  it('/api/v1/veiculo/:id (PATCH) Deve conseguir atualizar parcialmente os dados', async () => {
    const response = await request(app.getHttpServer())
      .patch('/api/v1/veiculo/1')
      .send({
        cor: 'Azul',
        tipo: 'Esportivo',
      });

    expect(response.status).toBe(HttpStatus.OK);

    const body: FindVeiculoOutputDto = response.body;
    expect(body.id).toEqual(1);
    expect(body.cor).toEqual('Azul');
    expect(body.tipo).toEqual('Esportivo');
  });

  it('/api/v1/veiculo/:id (PATCH) Deve retornar erro ao atualizar com dados inválidos', async () => {
    const response = await request(app.getHttpServer())
      .patch('/api/v1/veiculo/1')
      .send({
        cor: '',
        tipo: 'Esportivo',
      });

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);

    const response2 = await request(app.getHttpServer())
      .patch('/api/v1/veiculo/1')
      .send({
        cor: 'Azul',
        tipo: '',
      });

    expect(response2.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it('/api/v1/veiculo/:id (PATCH) Deve retornar erro com id não existente', async () => {
    const response = await request(app.getHttpServer())
      .patch('/api/v1/veiculo/2')
      .send({
        modelo: 'Gol 2',
        marca: 'Volkswagen',
        placa: 'ABC1234',
        cor: 'Vermelho',
        tipo: 'Hatch',
      });

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });

  it('/api/v1/veiculo/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer()).delete(
      '/api/v1/veiculo/1',
    );

    expect(response.status).toBe(HttpStatus.NO_CONTENT);
  });

  it('/api/v1/veiculo/:id (DELETE) Deve retornar erro com id não existente', async () => {
    const response = await request(app.getHttpServer()).delete(
      '/api/v1/veiculo/2',
    );

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });
});
