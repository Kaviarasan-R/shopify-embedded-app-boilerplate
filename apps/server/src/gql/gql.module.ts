import { Module } from '@nestjs/common';
import { GqlController } from './gql.controller';
import { GqlService } from './gql.service';
import { ShopifyModule } from '@/shopify/shopify.module';

@Module({
  imports: [ShopifyModule],
  controllers: [GqlController],
  providers: [GqlService],
})
export class GqlModule {}
