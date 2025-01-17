import { Inject, Injectable } from '@nestjs/common';
import { INJECT_TOKENS } from '../constants/injection-tokens';
import { ITemplateEngine } from '../interfaces/template-engine.interface';
import { EmailResponse, IEmailProvider } from '../interfaces/email-provider.interface';

export interface EmailData {
	to: string;
	subject: string;
	templateName: string;
	templateData: Record<string, any>;
}

@Injectable()
export class EmailService {
	constructor(
		@Inject(INJECT_TOKENS.EMAIL_PROVIDER)
		private readonly emailProvider: IEmailProvider,
		@Inject(INJECT_TOKENS.TEMPLATE_ENGINE)
		private readonly templateEngine: ITemplateEngine
	) {}

	async sendTemplateEmail(emailData: EmailData): Promise<EmailResponse> {
		try {
			const [renderedSubject, renderedContent] = await Promise.all([
				this.templateEngine.renderSubject(emailData.subject, emailData.templateData),
				this.templateEngine.render(emailData.templateName, emailData.templateData),
			]);
			return await this.emailProvider.sendEmail(emailData.to, renderedSubject, renderedContent);
		} catch (error: any) {
			return {
				success: false,
				error: error.message,
			};
		}
	}
}
