import { Injectable } from '@nestjs/common';

@Injectable()
export class AppUninstallService {
  constructor() {}

  async appUninstall(topic: string, shop: string, body: any, webhookId: any) {
    console.log(topic, shop, body, webhookId);
    return;
  }
}
