import { Body, Controller, Get, Post, Render, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { SendgridService } from './sendgrid/sendgrid.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private sgMail: SendgridService,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome To The Home Page!' };
  }

  @Post('/mail')
  mail(@Body() body: { name: string; email: string; message: string }) {
    const mail = {
      to: body.email,
      from: process.env.FROM_EMAIL,
      templateId: process.env.TEMP_ID,
      dynamic_template_data: {
        user: body.name,
        message: body.message,
      },
    };

    return this.sgMail.SendMail(mail);
  }
}
