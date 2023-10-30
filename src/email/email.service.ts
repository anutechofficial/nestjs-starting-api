import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail', // You can also use other providers
      auth: {
        user: 'anurag.yadav.henceforth@gmail.com',
        pass: 'wzkh cyft qzwc ityn',
      },
    });
  }

  async sendEmail(mailOptions) {
    await this.transporter.sendMail(mailOptions);
  }
}

