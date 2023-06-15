import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  process.env.TZ = 'America/Sao_Paulo';

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const config = new DocumentBuilder()
    .setTitle('API de estacionamento')
    .setDescription('API criada no teste Dr. Consulta')
    .setVersion('v1')
    .addBearerAuth()
    .addServer('http://localhost:3000/api/v1', 'Desenvolvimento')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);

  app.setGlobalPrefix('api/v1');

  await app.listen(3000);
}
bootstrap();
