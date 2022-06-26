import { Request, Response } from 'express';

import { Controller, POST } from '../../libs/express-routing';
import { UserRepo } from '../repositories/user.repo';
import { AuthService } from '../../modules/auth/auth.service';
import { ActivationCodeRepo } from '../repositories/activation-code.repo';
import { EmailProducers } from '../../jobs/producers/email.producers';

@Controller('/auth')
export class AuthController {
  private readonly authService: AuthService;
  constructor() {
    this.authService = new AuthService(
      new UserRepo(),
      new ActivationCodeRepo(),
      new EmailProducers(),
    );
  }

  @POST('/submit')
  async submit(req: Request, res: Response) {
    const info = await this.authService.submitOtp({
      identifier: req.body.identifier,
      method: req.body.method,
    });

    res.status(200).json({ message: 'Activation code cended for User!', info });
  }

  @POST('/verify')
  async verify(req: Request, res: Response) {
    const { token } = await this.authService.verifyOtp({
      method: req.body.method,
      identifier: req.body.identifier,
      code: req.body.code,
    });

    res.status(200).json({ message: 'Your account verified!', token });
  }
}
