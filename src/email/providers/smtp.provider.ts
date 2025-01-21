import { EmailResponse, IEmailProvider } from '../interfaces/email-provider.interface';
import nodeMailer, { Transporter } from 'nodemailer';

export interface SMTPProviderOptions {
	host?: string;
	port?: number;
	user?: string;
	password?: string;
	fromEmail?: string;
	secure?: boolean;
	service?: string;
	replyTo?: string;
}

export class SMTPProvider implements IEmailProvider {
	private readonly transport: Transporter;

	constructor(private options: SMTPProviderOptions) {
		console.log(this.options);
		this.transport = nodeMailer.createTransport({
			host: this.options.host,
			port: this.options.port,
			auth: {
				user: this.options.user,
				pass: this.options.password,
			},
			secure: this.options.secure || false,
			service: this.options.service || undefined,
			replyTo: this.options.replyTo || undefined,
		});
	}

	async sendEmail(to: string, subject: string, content: string): Promise<EmailResponse> {
		try {
			await this.transport.sendMail({
				from: this.options.fromEmail,
				to,
				subject,
				html: content,
			});
		} catch (error: any) {
			throw new Error(`Email sending failed: ${error.message}`);
		}

		return {
			success: true,
		};
	}
}
