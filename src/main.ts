import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders:
      'Content-Type, Authorization, X-Requested-With, X-HTTP-Method-Override',
    exposedHeaders:
      'Content-Type, Authorization, X-Requested-With, X-HTTP-Method-Override',
    preflightContinue: false,
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
