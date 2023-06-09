import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

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
