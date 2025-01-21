import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailersendModule } from './mailersend/mailersend.module';
import { SMTPModule } from './smtp/smtp.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		MailersendModule,
		SMTPModule,
	],
})
export class AppModule {}
