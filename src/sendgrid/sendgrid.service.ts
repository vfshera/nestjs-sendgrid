import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class SendgridService {
  constructor() {
    SendGrid.setApiKey(process.env.SEND_GRID_KEY);
  }

  async SendMail(mail: SendGrid.MailDataRequired) {
    await SendGrid.send(mail)
      .then(() => {
        console.log("Email Sent!");        
      })
      .catch((err) => console.error(err));
  }
}
