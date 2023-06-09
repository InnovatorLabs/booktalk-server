import { HttpResponseInterceptor } from './common/http-response.interceptor';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

const API_NAME = 'BookTalk API';
const API_CURRENT_VERSION = '0.0.1';
const SWAGGER_URL = 'docs/swagger-ui';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Swagger 문서 설정
  const options = new DocumentBuilder()
    .setTitle(API_NAME)
    .setVersion(API_CURRENT_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_URL, app, document);

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HttpResponseInterceptor());

  const port = configService.get('APP_PORT');

  await app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
bootstrap();
