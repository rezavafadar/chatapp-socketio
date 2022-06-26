import { ActivationCodeModel } from '../../schema/actiovation-code.schema';
import { Model } from 'mongoose';
import { IActivationCode } from '../../interfaces/activation-code.interface';

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

  deleteActivationCodeById(id: string) {
    return this.activationCodeModel.deleteOne({
      _id: id,
    });
  }
}
