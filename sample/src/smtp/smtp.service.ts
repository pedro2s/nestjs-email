import { Injectable } from '@nestjs/common';
import { EmailService } from '@pedro2s/nestjs-email';

@Injectable()
export class SMTPService {
	constructor(private readonly emailService: EmailService) {}

	async send({ name, email }: { name: string; email: string }) {
		return await this.emailService.sendTemplateEmail({
			to: email,
			subject: 'Olá {{ name }}, seja bem-vindo',
			templateName: 'welcome',
			templateData: { name: name },
		});
	}
}
