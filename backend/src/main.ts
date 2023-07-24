import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(
      '/Users/sungwookang/project/yyg/backend/src/config/cert.key',
    ),
    cert: fs.readFileSync(
      '/Users/sungwookang/project/yyg/backend/src/config/cert.crt',
    ),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(443, '0.0.0.0');
}
bootstrap();
