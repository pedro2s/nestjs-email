import { Injectable } from '@nestjs/common';
import { ITemplateEngine } from '../interfaces/template-engine.interface';
import { Liquid, LiquidOptions } from 'liquidjs';

@Injectable()
export class LiquidTemplateEngine implements ITemplateEngine {
	private readonly engine: Liquid;

	constructor(options: LiquidOptions) {
		this.engine = new Liquid(options);
	}

	async render(templateName: string, data: Record<string, any>): Promise<string> {
		try {
			return await this.engine.renderFile(templateName, data);
		} catch (error: any) {
			throw new Error(`Template redering failed: ${error.message}`);
		}
	}
	async renderSubject(template: string, data: Record<string, any>): Promise<string> {
		try {
			return await this.engine.parseAndRender(template, data);
		} catch (error: any) {
			throw new Error(`Template redering failed: ${error.message}`);
		}
	}
}
