import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './core/response.interceptor';
import { CustomExceptionFilter } from './core/exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ShopifyService } from './shopify/shopify.service';
import { WebhooksService } from './webhooks/webhooks.service';
import { AUTH_PATH, WEBHOOKS_PATH } from './utils/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.SHOPIFY_APP_URL,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    maxAge: 86400,
  });

  const httpAdapter = app.getHttpAdapter();
  const shopifyService = app.get(ShopifyService);
  const webhookHandlers = app.get(WebhooksService).webhookHandlers;

  httpAdapter.get(AUTH_PATH, shopifyService.shopifyApp.auth.begin());

  const hooksHandler = shopifyService.shopifyApp.processWebhooks({
    webhookHandlers,
  });

  // @ts-ignore
  httpAdapter.post(WEBHOOKS_PATH, hooksHandler);

  await app.listen(process.env.PORT || process.env.SERVER_PORT);
}
bootstrap();
