import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/provider/mailgun')
  sendGrid(@Body() body: any) {
    return this.appService.mailGun(body);
  }

  @Post('/provider/mailersend')
  mailerSend(@Body() body: any) {
    return this.appService.mailerSend(body);
  }
}
