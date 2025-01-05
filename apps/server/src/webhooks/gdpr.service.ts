import { Injectable } from '@nestjs/common';

@Injectable()
export class GDPRService {
  constructor() {}

  async gdpr(topic: string, shop: string, body: any, webhookId: any) {
    console.log(topic, shop, body, webhookId);
    return;
  }
}
