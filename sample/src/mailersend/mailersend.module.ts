import { Module } from '@nestjs/common';
import {
	EmailModule,
	MailerSendProvider,
	LiquidTemplateEngine,
} from '@pedro2s/nestjs-email';
import * as path from 'path';
import { MailersendController } from './mailersend.controller';
import { MailersendService } from './mailersend.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
	imports: [
		EmailModule.forRoot({
			provider: new MailerSendProvider(
				process.env.MAILERSEND_API_KEY,
				process.env.MAILERSEND_FROM_EMAIL,
			),
			templateEngine: new LiquidTemplateEngine({
				cache: false,
				extname: '.liquid',
				root: path.resolve(process.cwd(), 'src/templates'),
			}),
		}),
	],
	controllers: [MailersendController],
	providers: [MailersendService],
})
export class MailersendModule {}
