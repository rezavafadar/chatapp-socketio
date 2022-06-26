import { Job, Queue } from 'bull';

import { activationMail } from '../../constants';
import { emailQueue } from '../queues/email.queue';
import { MailService } from '../../services/mail.service';
import { MAIL_SERVICE_CONFIG } from '../../config/index';

export class EmailConsumers {
  private emailQueue: Queue;
  private mailService: MailService;

  constructor() {
    this.emailQueue = emailQueue;
    this.mailService = new MailService(MAIL_SERVICE_CONFIG);
  }

  initConsumers() {
    this.emailQueue.process(activationMail, this.activationMail.bind(this));
  }

  private activationMail(Job: Job) {
    this.mailService.sendEmail({
      subject: 'Activation Code!',
      from: MAIL_SERVICE_CONFIG.auth.user,
      to: Job.data.email,
      text: `Hello Friend!
      Your activation code: ${Job.data.code}
      `,
    });
  }
}
