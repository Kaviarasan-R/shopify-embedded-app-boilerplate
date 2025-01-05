import { ShopifyService } from '@/shopify/shopify.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ShopifyCSPMiddleware implements NestMiddleware {
  constructor(private shopifyService: ShopifyService) {}
  use(req: Request, res: Response, next: NextFunction) {
    return this.shopifyService.shopifyApp.cspHeaders()(req, res, next);
  }
}
