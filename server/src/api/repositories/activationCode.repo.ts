import { ActivationCodeModel } from '../../schema/actiovationCode.schema';
import { Model } from 'mongoose';
import { IActivationCode } from '../../interfaces/activationCode.interface';

export class ActivationCodeRepo {
  private activationCodeModel: Model<IActivationCode>;
  constructor() {
    this.activationCodeModel = ActivationCodeModel;
  }

  create(data: IActivationCode) {
    return this.activationCodeModel.create(data);
  }

  findByIdentifier(identifier: string) {
    return this.activationCodeModel.findOne({
      identifier,
    });
  }
}
