import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail', // You can also use other providers
      auth: {
        user: process.env.OUT_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(mailOptions) {
    await this.transporter.sendMail(mailOptions);
    return true;
  }
}

