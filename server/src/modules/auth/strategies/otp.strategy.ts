import { ExceptionError } from '../../../exception/exception.error';
import { messageService } from '../../../services/messages.service';
import { RESEND_TIME_ACTIVATION_CODE } from '../../../constants';
import { ACTIVATION_CODE_TIME_EXPIRATION } from '../../../constants/index';

import type { IActivationCode } from '../../../interfaces/activation-code.interface';
import type { ActivationCodeRepo } from '../../../repositories/activation-code.repo';

export class OtpStrategy {
  constructor(private readonly activationCodeRepo: ActivationCodeRepo) {}

  private generateCode(range: number = 5) {
    const litters = '1326458790';
    let code: string = '';

    for (let i = 1; i <= range; i++) {
      const random = Math.floor(Math.random() * 10);
      code += litters[random];
    }

    return code;
  }

  private async resendCodeHandler(previousCode: IActivationCode) {
    const allowDateToResend = new Date();
    allowDateToResend.setMinutes(
      previousCode.expireAt.getMinutes() - RESEND_TIME_ACTIVATION_CODE,
    );

    if (allowDateToResend > new Date()) {
      throw new ExceptionError(
        messageService.getMessage('activation-code.exists.name'),
        400,
        messageService.getMessage('activation-code.exists.message'),
      );
    }
    await this.activationCodeRepo.deleteActivationCodeById(previousCode.id);
  }

  async submit(identifier: string) {
    const currentActivationCode =
      await this.activationCodeRepo.findByIdentifierNotExpired(identifier);

    if (currentActivationCode) {
      await this.resendCodeHandler(currentActivationCode);
    }

    const activationCode = this.generateCode();

    const codeExpirationDate = new Date();
    codeExpirationDate.setMinutes(
      new Date().getMinutes() + ACTIVATION_CODE_TIME_EXPIRATION,
    );

    await this.activationCodeRepo.create({
      code: activationCode,
      identifier: identifier,
      expireAt: codeExpirationDate,
    });

    return { activationCode };
  }

  async verify(identifier: string, code: string) {
    const activationCode =
      await this.activationCodeRepo.findByIdentifierNotExpired(identifier);

    if (!activationCode)
      throw new ExceptionError(
        messageService.getMessage('activation-code.not.exists.name'),
        400,
        messageService.getMessage('activation-code.not.exists.message'),
      );

    if (activationCode.code !== code)
      throw new ExceptionError(
        messageService.getMessage('activation-code.incorrect.name'),
        400,
        messageService.getMessage('activation-code.incorrect.message'),
      );

    await this.activationCodeRepo.deleteActivationCodeById(activationCode.id);
  }
}
