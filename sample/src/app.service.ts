import { Injectable } from '@nestjs/common';
import { EmailService } from '@pedro2s/nestjs-email';

@Injectable()
export class AppService {
  constructor(private readonly emailService: EmailService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async mailGun({ nome, email }: { nome: string; email: string }) {
    return await this.emailService.sendTemplateEmail({
      to: email,
      subject: 'Olá {{ nome}}, seja bem-vindo',
      templateName: 'welcome',
      templateData: { name: nome },
    });
  }

  async mailerSend({ nome, email }: { nome: string; email: string }) {
    return await this.emailService.sendTemplateEmail({
      to: email,
      subject: 'Olá {{ nome}}, seja bem-vindo',
      templateName: 'welcome',
      templateData: { name: nome },
    });
  }
}
