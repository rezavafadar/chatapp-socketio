import { ExceptionError } from '../../exception/exception.error';

import type { IUser } from '../../interfaces/user.interface';
import type { UserRepo } from '../../api/repositories/user.repo';
import type { SubmitOTPInfo } from '../../interfaces/auth.interfaces';
import type { ActivationCodeRepo } from '../../api/repositories/activationCode.repo';
import { SubmitOtpValidation } from './auth.validation';

export class AuthService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly activationCodeRepo: ActivationCodeRepo,
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
      throw new ExceptionError('User Blocked!', 400, "User's Account Blocked!");
    }

    if (!user) {
      console.log('User created!');

      await this.userRepo.create({
        [details.method]: details.identifier,
      });
    }

    const existingActivationCode =
      await this.activationCodeRepo.findByIdentifier(details.identifier);
    console.log(existingActivationCode);

    if (existingActivationCode) {
      console.log('Code Exsist');

      throw new ExceptionError(
        'Activation Code Exists!',
        400,
        'You already have an activation Code!',
      );
    }

    const activationCode = this.generateCode();

    await this.activationCodeRepo.create({
      code: activationCode,
      identifier: details.identifier,
    });

    //Todo: ADD Email Or Phone SMS Sender

    return 'okk';
  }
}
