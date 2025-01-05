import { Controller, Get, Module, Req, Res } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ALLOWED_URLS, AUTH_CALLBACK_PATH } from './utils/constants';
import { NextFunction, Request, Response } from 'express';
import { readFileSync } from 'fs';
import { ShopifyService } from './shopify/shopify.service';

@Module({
  imports: [ConfigModule],
})
@Controller()
export class AppController {
  private readonly STATIC_PATH =
    this.configService.get<string>('NODE_ENV') === 'prod'
      ? join(__dirname, '../', 'client')
      : join(__dirname, '../../apps/', 'client');

  constructor(
    private readonly configService: ConfigService,
    private readonly shopifyService: ShopifyService,
  ) {}

  @Get(ALLOWED_URLS)
  root(@Req() req: Request, @Res() res: Response) {
    try {
      const shop = req.query.shop;
      const filePath = join(this.STATIC_PATH, 'index.html');
      let htmlContent = readFileSync(filePath, 'utf-8');

      htmlContent = htmlContent.replace(
        '</head>',
        `<meta name="shopify-api-key" content="${this.configService.get('SHOPIFY_API_KEY')}">\n</head>`,
      );

      return res
        .status(200)
        .set('Content-Type', 'text/html')
        .setHeader(
          'Content-Security-Policy',
          `frame-ancestors https://${shop} https://admin.shopify.com;`,
        )
        .setHeader('X-Frame-Options', 'ALLOW-FROM *')
        .send(htmlContent);
    } catch (error) {
      console.error(error);
      throw new Error('Unable to render content');
    }
  }

  @Get(AUTH_CALLBACK_PATH)
  callback(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      return this.shopifyService.shopifyApp.redirectToShopifyOrAppRoot()(
        req,
        res,
        next,
      );
    } catch (error) {
      console.error(error);
      throw new Error('Error at auth/callback');
    }
  }
}
