import Joi from 'joi';

import type { SubmitOTPInfo } from '../../interfaces/auth.interfaces';
import { ExceptionError } from '../../exception/exception.error';

export class SubmitOtpValidation {
  private schema: Joi.AnySchema<SubmitOTPInfo>;
  constructor() {
    this.schema = Joi.object({
      method: Joi.valid('email', 'phone').required(),
      identifier: Joi.string()
        .when('method', { is: 'email', then: Joi.string().email() })
        .when('method', {
          is: 'phone',
          then: Joi.string().pattern(/^(\+98|0)?9\d{9}$/),
        })
        .required(),
    });
  }

  async validate(data: SubmitOTPInfo) {
    try {
      await this.schema.validateAsync(data, {
        abortEarly: true,
      });
    } catch (error) {
      throw new ExceptionError(
        'Validation Failed!',
        400,
        error.details[0].message,
      );
    }
  }
}
