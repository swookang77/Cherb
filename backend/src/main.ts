import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as http from 'http';
import * as https from 'https';
async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(
      '/etc/letsencrypt/live/kangsungwoo.link/privkey.pem',
    ),
    cert: fs.readFileSync(
      '/etc/letsencrypt/live/kangsungwoo.link/fullchain.pem',
    ),
  };
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server),);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());
  await app.init();

  http.createServer(server).listen(80);
  https.createServer(httpsOptions,server).listen(443);
}
bootstrap();
