import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {HttpExceptionFilter} from "./common/http-exception.filter";
import {LogIntercetor} from "./common/log.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LogIntercetor());
  await app.listen(3000);
}
bootstrap();
