import { ExceptionError } from '../../exception/exception.error';
import { VerifyOtpValidation, SubmitOtpValidation } from './auth.validation';
import { messageService } from '../../services/messages.service';
import { RESEND_TIME_ACTIVATION_CODE } from '../../constants';

import type { IUser } from '../../interfaces/user.interface';
import type { UserRepo } from '../../api/repositories/user.repo';
import type {
  SubmitOTPInfo,
  VerifyOtpInfo,
} from '../../interfaces/auth.interfaces';
import type { ActivationCodeRepo } from '../../api/repositories/activation-code.repo';
import type { EmailProducers } from '../../jobs/producers/email.producers';

export class AuthService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly activationCodeRepo: ActivationCodeRepo,
    private readonly emailProducers: EmailProducers,
  ) {}

  private generateCode(range: number = 5) {
    const litters = '1326458790';
    let code: string = '';

    for (let i = 1; i <= range; i++) {
      const random = Math.floor(Math.random() * 10);
      code += litters[random];
    }

    return code;
  }

  async submitOtp(details: SubmitOTPInfo) {
    await new SubmitOtpValidation().validate(details);

    const user: IUser = await this.userRepo.findByPhoneOrEmail(
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
      await this.userRepo.create({
        [details.method]: details.identifier,
      });
    }

    const existingActivationCode =
      await this.activationCodeRepo.findByIdentifier(details.identifier);

    if (existingActivationCode) {
      if (existingActivationCode.expireAt < new Date()) {
        await this.activationCodeRepo.deleteActivationCodeById(
          existingActivationCode.id,
        );
      } else {
        const allowDateToResend = new Date();
        allowDateToResend.setMinutes(
          existingActivationCode.expireAt.getMinutes() - 2,
        );

        if (allowDateToResend > new Date()) {
          throw new ExceptionError(
            messageService.getMessage('activation-code.exists.name'),
            400,
            messageService.getMessage('activation-code.exists.message'),
          );
        } else {
          await this.activationCodeRepo.deleteActivationCodeById(
            existingActivationCode.id,
          );
        }
      }
    }

    // TODO: seprate OTP strategy
    const activationCode = this.generateCode();

    const codeExpirationDate = new Date();
    codeExpirationDate.setMinutes(new Date().getMinutes() + 5);

    await this.activationCodeRepo.create({
      code: activationCode,
      identifier: details.identifier,
      expireAt: codeExpirationDate,
    });

    if (details.method === 'email') {
      this.emailProducers.activationMail(details.identifier, activationCode);
    } else {
      // need SMS pannel
    }

    return { resendTime: RESEND_TIME_ACTIVATION_CODE };
  }

  async verifyOtp(details: VerifyOtpInfo) {
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

    const activationCode = await this.activationCodeRepo.findByIdentifier(
      details.identifier,
    );

    if (!activationCode)
      throw new ExceptionError(
        messageService.getMessage('activation-code.not.exists.name'),
        400,
        messageService.getMessage('activation-code.not.exists.message'),
      );

    if (activationCode.code !== details.code)
      throw new ExceptionError(
        messageService.getMessage('activation-code.incorrect.name'),
        400,
        messageService.getMessage('activation-code.incorrect.message'),
      );

    await this.activationCodeRepo.deleteActivationCodeById(activationCode.id);

    let testToken = '07dsddsf';

    await this.userRepo.updateUserById(user.id, {
      active: true,
    });

    return { token: testToken };
  }
}
