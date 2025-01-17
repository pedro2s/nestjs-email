import { DynamicModule, Module } from '@nestjs/common';
import { EmailModuleOptions } from './interfaces/email-options.interface';
import { INJECT_TOKENS } from './constants/injection-tokens';
import { EmailService } from './services/email.service';

function resolveInstance<T>(
	instance: T | (new (...args: any[]) => T),
	args?: any[],
): T {
	if (instance instanceof Function) {
		return new instance(...(args || []));
	}
	return instance;
}

@Module({})
export class EmailModule {
	static forRoot(
		options: EmailModuleOptions & { isGlobal?: boolean },
	): DynamicModule {
		return {
			module: EmailModule,
			global: !!options?.isGlobal,
			providers: [
				{
					provide: INJECT_TOKENS.EMAIL_PROVIDER,
					useFactory: () => resolveInstance(options.provider),
				},
				{
					provide: INJECT_TOKENS.TEMPLATE_ENGINE,
					useFactory: () => resolveInstance(options.templateEngine),
				},
				{
					provide: EmailService,
					useClass: EmailService,
				},
			],
			exports: [
				EmailService,
				INJECT_TOKENS.EMAIL_PROVIDER,
				INJECT_TOKENS.TEMPLATE_ENGINE,
			],
		};
	}
}
