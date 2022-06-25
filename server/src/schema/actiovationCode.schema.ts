import { model, Schema } from 'mongoose';
import { IActivationCode } from '../interfaces/activationCode.interface';

const activationCodeSchema = new Schema<IActivationCode>({
  code: { type: String, requied: true },
  createdAt: {
    type: Date,
    expires: '5m',
    default: Date.now(),
  },
  identifier: { type: String, required: true },
});

export const ActivationCodeModel = model<IActivationCode>(
  'activationCode',
  activationCodeSchema,
);
