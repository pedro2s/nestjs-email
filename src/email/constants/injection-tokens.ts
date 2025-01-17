export const INJECT_TOKENS = {
	EMAIL_PROVIDER: 'EMAIL_PROVIDER',
	TEMPLATE_ENGINE: 'TEMPLATE_ENGINE',
} as const;

export type InjectionTokens = (typeof INJECT_TOKENS)[keyof typeof INJECT_TOKENS];
