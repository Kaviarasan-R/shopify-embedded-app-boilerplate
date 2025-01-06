import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ShopifyModule } from './shopify/shopify.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { ShopifyCallBackMiddleware } from './middleware/shopify-auth-callback.middleware';
import {
  AUTH_CALLBACK_PATH,
  AUTH_PATH,
  EXITIFRAME_PATH,
  WEBHOOKS_PATH,
} from './utils/constants';
import { ShopifyEnsureMiddleware } from './middleware/shopify-ensure.middleware';
import { ShopifyCSPMiddleware } from './middleware/shopify-csp.middleware';
import { ShopifyValidateAuthenticatedSessionMiddleware } from './middleware/shopify-validate-session.middleware';
import { GqlModule } from './gql/gql.module';
import { GqlController } from './gql/gql.controller';

@Module({
  imports: [
    // Path to .env from dist/server
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../../', '.env'),
      isGlobal: true,
    }),
    ShopifyModule,
    WebhooksModule,
    GqlModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ShopifyCSPMiddleware)
      .exclude(
        AUTH_PATH,
        AUTH_CALLBACK_PATH,
        WEBHOOKS_PATH,
        '/api/auth/(.*)',
        '/api/auth/callback/(.*)',
        '/api/webhooks/(.*)',
      )
      .forRoutes('*');
    consumer.apply(ShopifyCallBackMiddleware).forRoutes(AUTH_CALLBACK_PATH);
    consumer
      .apply(ShopifyEnsureMiddleware)
      .exclude(
        { path: EXITIFRAME_PATH, method: RequestMethod.GET },
        { path: AUTH_CALLBACK_PATH, method: RequestMethod.GET },
      )
      .forRoutes(AppController);
    consumer
      .apply(ShopifyValidateAuthenticatedSessionMiddleware)
      .forRoutes(GqlController);
  }
}
