import { ResCtx } from '@/core/response.decorator';
import { Controller, Get, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { GqlService } from './gql.service';

@Controller('/api/gql')
export class GqlController {
  constructor(private readonly gqlService: GqlService) {}

  @Get('get-shop')
  getShop(@Req() req: Request, @ResCtx() res: Response) {
    return this.gqlService.getShop(req, res);
  }
}
