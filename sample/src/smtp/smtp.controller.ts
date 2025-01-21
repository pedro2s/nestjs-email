import { Body, Controller, Post } from '@nestjs/common';
import { SMTPService } from './smtp.service';

@Controller('smtp')
export class SMTPController {
	constructor(private readonly smtpService: SMTPService) {}

	@Post()
	send(@Body() body: any) {
		return this.smtpService.send(body);
	}
}
