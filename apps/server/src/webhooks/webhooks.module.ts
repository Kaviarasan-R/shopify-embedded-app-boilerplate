import { Module } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { AppUninstallService } from './app-uninstall.service';
import { GDPRService } from './gdpr.service';

@Module({
  providers: [WebhooksService, AppUninstallService, GDPRService],
  exports: [WebhooksService],
})
export class WebhooksModule {}
