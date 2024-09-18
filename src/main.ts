import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from "express";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Mở chặn truy cập
  app.enableCors()
  // Add validator 
  app.useGlobalPipes(new ValidationPipe())
  app.use(express.static("."))
  // Thêm '/api' cho tất cả các route 
  app.setGlobalPrefix('api');  
  // yarn add @nestjs/swagger swagger-ui-express
  const config = new DocumentBuilder().setTitle("Airbnb").setVersion("v1").addBearerAuth().build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/swagger", app, document)
  // Khởi động server
  await app.listen(8080);
}
bootstrap();