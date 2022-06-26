import { Queue } from 'bull';

import { activationMail } from '../../constants';
import { emailQueue } from '../queues/email.queue';

export class EmailProducers {
  private emailQueue: Queue;

  constructor() {
    this.emailQueue = emailQueue;
  }

  activationMail(email: string, code: string) {
    this.emailQueue.add(activationMail, { email, code });
  }
}
