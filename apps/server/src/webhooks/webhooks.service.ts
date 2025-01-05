import { WEBHOOKS_PATH } from '@/utils/constants';
import { Injectable, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DeliveryMethod } from '@shopify/shopify-api';
import { WebhookHandlersParam } from '@shopify/shopify-app-express';
import { AppUninstallService } from './app-uninstall.service';
import { GDPRService } from './gdpr.service';

@Module({
  imports: [ConfigModule],
})
@Injectable()
export class WebhooksService {
  constructor(
    private readonly appUninstallService: AppUninstallService,
    private readonly gdprService: GDPRService,
  ) {}

  public webhookHandlers: WebhookHandlersParam = {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: WEBHOOKS_PATH,
      callback: async (topic, shop, body, webhookId) => {
        await this.appUninstallService.appUninstall(
          topic,
          shop,
          body,
          webhookId,
        );
      },
    },
    CUSTOMERS_DATA_REQUEST: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: WEBHOOKS_PATH,
      callback: async (topic, shop, body, webhookId) => {
        await this.gdprService.gdpr(topic, shop, body, webhookId);
      },
    },
    CUSTOMERS_REDACT: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: WEBHOOKS_PATH,
      callback: async (topic, shop, body, webhookId) => {
        await this.gdprService.gdpr(topic, shop, body, webhookId);
      },
    },
    SHOP_REDACT: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: WEBHOOKS_PATH,
      callback: async (topic, shop, body, webhookId) => {
        await this.gdprService.gdpr(topic, shop, body, webhookId);
      },
    },
  };
}
