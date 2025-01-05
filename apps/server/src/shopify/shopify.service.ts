import {
  AUTH_CALLBACK_PATH,
  AUTH_PATH,
  WEBHOOKS_PATH,
} from '@/utils/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LATEST_API_VERSION, LogSeverity } from '@shopify/shopify-api';
import { shopifyApp, ShopifyApp } from '@shopify/shopify-app-express';
import { RedisSessionStorage } from '@shopify/shopify-app-session-storage-redis';

@Injectable()
export class ShopifyService {
  public shopifyApp: ShopifyApp;

  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    if (!this.shopifyApp) {
      this.shopifyApp = shopifyApp({
        api: {
          apiKey: this.configService.get<string>('SHOPIFY_API_KEY'),
          apiSecretKey: this.configService.get<string>('SHOPIFY_API_SECRET'),
          scopes: this.configService
            .get<string>('SHOPIFY_API_SCOPES')
            .split(','),
          hostName: this.configService
            .get<string>('SHOPIFY_APP_URL')
            .replace(/https:\/\//, ''),
          hostScheme: 'https',
          apiVersion: LATEST_API_VERSION,
          isEmbeddedApp: true,
          logger: {
            level: LogSeverity.Debug,
          },
          future: {
            v10_lineItemBilling: false,
            customerAddressDefaultFix: true,
            lineItemBilling: true,
            unstable_managedPricingSupport: true,
          },
        },
        sessionStorage: new RedisSessionStorage(
          this.configService.get<string>('REDIS_URL'),
        ),
        auth: {
          path: AUTH_PATH,
          callbackPath: AUTH_CALLBACK_PATH,
        },
        webhooks: {
          path: WEBHOOKS_PATH,
        },
        useOnlineTokens: true,
        exitIframePath: '/exitframe',
      });
    }
  }
}
