import { Transporter, createTransport } from 'nodemailer';
import { Options, MailOptions } from 'nodemailer/lib/smtp-transport';

export class MailService {
  private transport: Transporter;
  constructor(transportConfig: Options) {
    this.transport = createTransport(transportConfig);
  }

  async sendEmail(mailOpt: MailOptions) {
    return this.transport.sendMail(mailOpt);
  }
}
