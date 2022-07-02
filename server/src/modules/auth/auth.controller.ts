import { Request, Response } from 'express';

import { Controller, POST } from '../../libs/express-routing';
import { UserRepo } from '../../repositories/user.repo';
import { AuthService } from './auth.service';
import { EmailProducers } from '../../jobs/producers/email.producers';

@Controller('/auth')
export class AuthController {
  private readonly authService: AuthService;
  constructor() {
    this.authService = new AuthService(new UserRepo(), new EmailProducers());
  }

  @POST('/verify')
  async submit(req: Request, res: Response) {
    const { resendTime, user } = await this.authService.verify({
      identifier: req.body.identifier,
      method: req.body.method,
    });

    req.session.userId = user.id;
    res
      .status(200)
      .json({ message: 'Activation code cended for User!', resendTime, user });
  }

  @POST('/verify/code')
  async verify(req: Request, res: Response) {
    const { user } = await this.authService.verifyCode({
      method: req.body.method,
      identifier: req.body.identifier,
      code: req.body.code,
    });

    res.status(200).json({ message: 'Your account verified!', user });
  }
}
