import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import { EmailResponse, IEmailProvider } from '../interfaces/email-provider.interface';

@Injectable()
export class SendGridProvider implements IEmailProvider {
	constructor(private readonly apiKey: string, private readonly fromEmail: string) {
		SendGrid.setApiKey(this.apiKey);
	}

	async sendEmail(to: string, subject: string, content: string): Promise<EmailResponse> {
		try {
			const [response] = await SendGrid.send({
				to,
				from: this.fromEmail,
				subject,
				html: content,
			});
			return {
				success: true,
				messageId: response.headers['x-message-id'],
			};
		} catch (error: any) {
			return {
				success: false,
				error: error.message,
			};
		}
	}
}
