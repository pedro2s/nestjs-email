import { IEmailProvider } from './email-provider.interface';
import { ITemplateEngine } from './template-engine.interface';

export interface EmailModuleOptions {
	provider: IEmailProvider | (new (...args: any[]) => IEmailProvider);
	templateEngine: ITemplateEngine;
}
