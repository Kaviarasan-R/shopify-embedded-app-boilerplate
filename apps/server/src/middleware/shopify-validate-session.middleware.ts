import { ShopifyService } from '@/shopify/shopify.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ShopifyValidateAuthenticatedSessionMiddleware
  implements NestMiddleware
{
  constructor(private shopifyService: ShopifyService) {}
  use(req: Request, res: Response, next: NextFunction) {
    return this.shopifyService.shopifyApp.validateAuthenticatedSession()(
      req,
      res,
      next,
    );
  }
}
