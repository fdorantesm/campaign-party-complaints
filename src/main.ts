import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import * as express from 'express';
import * as http from 'http';
import * as https from 'https';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { ServerConfigType } from './modules/config/types/server.type';

declare const module: any;

async function main() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H',
  );
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  const configService: ConfigService = app.get('ConfigService');
  const appConfig = configService.get<ServerConfigType>('server');
  let httpsOptions: HttpsOptions;

  if (appConfig.securePort) {
    try {
      const key = readFileSync(
        join(dirname(__dirname), 'private/ssl/server.key'),
      );
      const cert = readFileSync(
        join(dirname(__dirname), 'private/ssl/server.crt'),
      );
      httpsOptions = {
        key,
        cert,
      };
    } catch (err) {
      Logger.error(
        'Nest secure application not successfully',
        null,
        'NestApplication',
      );
    }
  }

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.init();

  http.createServer(server).listen(appConfig.port);

  if (appConfig.securePort) {
    https.createServer(httpsOptions, server).listen(appConfig.securePort);
  }
}

main();
