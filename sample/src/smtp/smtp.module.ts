import { Module } from '@nestjs/common';
import {
	EmailModule,
	LiquidTemplateEngine,
	SMTPProvider,
} from '@pedro2s/nestjs-email';
import * as path from 'path';
import { SMTPController } from './smtp.controller';
import { SMTPService } from './smtp.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
	imports: [
		EmailModule.forRoot({
			provider: new SMTPProvider({
				host: process.env.SMTP_HOST,
				port: parseInt(process.env.SMTP_PORT || '587'),
				user: process.env.SMTP_USER,
				password: process.env.SMTP_PASSWORD,
				fromEmail: process.env.SMTP_FROM,
				replyTo: 'no-reply@example.com',
				service: process.env.SMTP_SERVICE,
				secure: false,
			}),
			templateEngine: new LiquidTemplateEngine({
				cache: false,
				extname: '.liquid',
				root: path.resolve(process.cwd(), 'src/templates'),
			}),
		}),
	],
	controllers: [SMTPController],
	providers: [SMTPService],
})
export class SMTPModule {}
