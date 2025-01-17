import { EmailResponse, IEmailProvider } from "../interfaces/email-provider.interface";
import { Recipient, EmailParams, MailerSend, Sender } from 'mailersend';

export class MailerSendProvider implements IEmailProvider {
    private  mailersend: MailerSend;

    constructor(private apiKey: string, private fromEmail: string) {
        this.mailersend = new MailerSend({
            apiKey: this.apiKey
        })
    }

    async sendEmail(to: string, subject: string, content: string): Promise<EmailResponse> {
        const recipient: Recipient[] = [new Recipient(to)];
        const emailParams: EmailParams = new EmailParams()
            .setFrom(new Sender(this.fromEmail))
            .setTo(recipient)
            .setSubject(subject)
            .setSubject(subject)
            .setHtml(content)

        try {
            await this.mailersend.email.send(emailParams);
        } catch (error:any) {
            throw new Error(`Email sending failed: ${error?.body?.message}`);
        }

        return {
            success: true,
        }
    }
}