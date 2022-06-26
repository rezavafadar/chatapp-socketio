import { Options } from 'nodemailer/lib/smtp-transport';

const env = process.env;

export const MAIL_SERVICE_CONFIG: Options = {
  auth: {
    pass: env.MAIL_ACC_PASS,
    user: env.MAIL_ACC_USER,
  },
  host: env.MAIL_HOST,
  port: Number(env.MAIL_PORT),
};

export const PORT = Number(env.PORT);

export const MONGO_URI = env.MONGO_URI;
