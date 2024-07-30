import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from '../config/envs';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Auth-ms');

  const app = await NestFactory.create(AppModule);

  // pipe options
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.NATS,
      options: {
        servers: envs.natsServers,
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();
  await app.listen(envs.port);

  logger.log(`Auth-ms is running on port ${envs.port}`);
}
bootstrap();
