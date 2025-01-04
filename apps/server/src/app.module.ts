import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    // Path to .env from dist/server (POV)
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../../', '.env'),
      isGlobal: true,
    }),
    // Path to dist/client from dist/server (POV)
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'client'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
