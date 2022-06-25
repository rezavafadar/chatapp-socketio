import { Request, Response } from 'express';

import { Controller, POST } from '../../libs/express-routing';
import { UserRepo } from '../repositories/user.repo';
import { AuthService } from '../../modules/auth/auth.service';
import { ActivationCodeRepo } from '../repositories/activationCode.repo';

@Controller('/auth')
export class AuthController {
  private readonly authService: AuthService;
  constructor() {
    this.authService = new AuthService(
      new UserRepo(),
      new ActivationCodeRepo(),
    );
  }

  @POST('/submit')
  async submit(req: Request, res: Response) {
    await this.authService.submitOtp({
      identifier: req.body.identifier,
      method: req.body.method,
    });

    res.status(200).json({ message: 'Activation Code Sended For U!' });
  }
}
