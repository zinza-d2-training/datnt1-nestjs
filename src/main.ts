import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors({
    // origin: [
    //   'https://datnt1-react-ewq3mo8pl-datnt1-react.vercel.app/',
    //   'http://localhost:3000',
    // ],
    // credentials: true,
    origin: true,
  });
  await app.listen(5000);
}
bootstrap();
