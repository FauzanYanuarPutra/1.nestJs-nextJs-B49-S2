import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import * as cors from 'cors'; 

// const customCors = (req: Request, res: Response, next: NextFunction) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Credentials', 'true'); 
//   next();
// };

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json());
  // app.use(customCors);
  app.use(cors());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  await app.listen(7000);
}
bootstrap();

