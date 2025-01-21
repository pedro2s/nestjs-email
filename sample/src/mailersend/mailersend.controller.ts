import { Body, Controller, Post } from '@nestjs/common';
import { MailersendService } from './mailersend.service';

@Controller('mailersend')
export class MailersendController {
	constructor(private readonly appService: MailersendService) {}

	@Post()
	send(@Body() body: any) {
		return this.appService.send(body);
	}
}
