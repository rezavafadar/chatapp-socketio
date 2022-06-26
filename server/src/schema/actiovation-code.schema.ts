import { model, Schema } from 'mongoose';
import { IActivationCode } from '../interfaces/activation-code.interface';

const activationCodeSchema = new Schema<IActivationCode>({
  code: { type: String, requied: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  identifier: { type: String, required: true },
  expireAt: {
    type: Date,
    required: true,
  },
});

export const ActivationCodeModel = model<IActivationCode>(
  'activationCode',
  activationCodeSchema,
);
