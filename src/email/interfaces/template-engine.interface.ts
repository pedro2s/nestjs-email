export interface ITemplateEngine {
	render(templateName: string, data: Record<string, any>): Promise<string>;
	renderSubject(template: string, data: Record<string, any>): Promise<string>;
}
