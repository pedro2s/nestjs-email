import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  EmailModule,
  LiquidTemplateEngine,
  MailerSendProvider,
} from '@pedro2s/nestjs-email';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EmailModule.forRoot({
      provider: new MailerSendProvider(
        process.env.MAILERSEND_API_KEY,
        process.env.FROM_EMAIL,
      ),
      templateEngine: new LiquidTemplateEngine({
        cache: false,
        extname: '.liquid',
        root: path.resolve(process.cwd(), 'src/templates'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
