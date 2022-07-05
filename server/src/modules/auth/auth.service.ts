import { ExceptionError } from '../../exception/exception.error';
import { VerifyOtpValidation, SubmitOtpValidation } from './auth.validation';
import { messageService } from '../../services/messages.service';
import { RESEND_TIME_ACTIVATION_CODE } from '../../constants';
import { ActivationCodeRepo } from '../../repositories/activation-code.repo';

import type { IUser } from '../../interfaces/user.interface';
import type { UserRepo } from '../../repositories/user.repo';
import type {
  SubmitOTPInfo,
  VerifyOtpInfo,
} from '../../interfaces/auth.interfaces';
import type { EmailProducers } from '../../jobs/producers/email.producers';
import { OtpStrategy } from './strategies/otp.strategy';

export class AuthService {
  private readonly otpStrategy: OtpStrategy;
  constructor(
    private readonly userRepo: UserRepo,
    private readonly emailProducers: EmailProducers,
  ) {
    this.otpStrategy = new OtpStrategy(new ActivationCodeRepo());
  }

  async verify(details: SubmitOTPInfo) {
    await new SubmitOtpValidation().validate(details);

    let user: IUser = await this.userRepo.findByPhoneOrEmail(
      details.method,
      details.identifier,
    );

    if (user && user.blocked) {
      throw new ExceptionError(
        messageService.getMessage('user.blocked.name'),
        400,
        messageService.getMessage('user.blocked'),
      );
    }

    if (!user) {
      user = await this.userRepo.create({
        [details.method]: details.identifier,
      });
    }

    const { activationCode } = await this.otpStrategy.submit(
      details.identifier,
    );

    if (details.method === 'email') {
      this.emailProducers.activationMail(details.identifier, activationCode);
    } else {
      // need SMS pannel
    }

    return { resendTime: RESEND_TIME_ACTIVATION_CODE, user };
  }

  async verifyCode(details: VerifyOtpInfo) {
    await new VerifyOtpValidation().validate(details);

    const user = await this.userRepo.findByPhoneOrEmail(
      details.method,
      details.identifier,
    );

    if (!user)
      throw new ExceptionError(
        messageService.getMessage('user.not.deined.name'),
        400,
        messageService.getMessage('user.not.deined.message'),
      );

    if (user.blocked)
      throw new ExceptionError(
        messageService.getMessage('user.blocked.name'),
        400,
        messageService.getMessage('user.blocked.message'),
      );

    await this.otpStrategy.verify(details.identifier, details.code);

    await this.userRepo.updateUserById(user.id, {
      active: true,
    });

    return { user };
  }
}
