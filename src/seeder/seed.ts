import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SeedModule } from './seed.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(SeedModule);
  const seederService = app.get(SeederService);
  await seederService.seed();
  await app.close();
}

bootstrap();
