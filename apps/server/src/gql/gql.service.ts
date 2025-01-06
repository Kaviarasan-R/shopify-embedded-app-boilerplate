import { ShopifyService } from '@/shopify/shopify.service';
import { SHOP_QUERY } from '@/utils/constants';
import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class GqlService {
  constructor(private readonly shopifyService: ShopifyService) {}

  async getShop(req: Request, res: Response) {
    try {
      const session = res.locals.shopify.session;

      const client = new this.shopifyService.shopifyApp.api.clients.Graphql({
        session,
      });

      const shop = await client.request(SHOP_QUERY, { retries: 3 });

      return {
        success: true,
        message: 'Successully called gql',
        data: shop.data,
      };
    } catch (error) {
      console.error(error);
      throw new Error('error at calling gql');
    }
  }
}
