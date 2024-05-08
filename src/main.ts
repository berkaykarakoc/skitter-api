import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { AllExceptionsFilter, HttpExceptionFilter } from './filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const adapterHost = app.get(HttpAdapterHost);
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
  app.useGlobalFilters(new AllExceptionsFilter(adapterHost));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
