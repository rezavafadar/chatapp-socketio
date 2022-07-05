import Queue from 'bull';

export const emailQueue = new Queue('EmailQueue', {
  defaultJobOptions: {
    removeOnComplete: true,
  },
});
