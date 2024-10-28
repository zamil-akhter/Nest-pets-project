import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SendEmail {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAILID,
        pass: process.env.GMAILPASSWORD,
      },
    });
  }
  async sendEmail(mailOptions) {
    try {
      const info = await this.transporter.sendMail(mailOptions);
    } catch (e) {
      console.log('Error, ', e.message);
    }
  }
}
