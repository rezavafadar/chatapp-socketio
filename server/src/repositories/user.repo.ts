import { AuthMethodEnum } from '../interfaces/auth.interfaces';
import { Model } from 'mongoose';
import { UserModel } from '../schema/user.schema';
import { IUser } from '../interfaces/user.interface';

export class UserRepo {
  private userModel: Model<IUser>;
  constructor() {
    this.userModel = UserModel;
  }

  create(data: IUser) {
    return this.userModel.create(data);
  }

  findByPhoneOrEmail(method: AuthMethodEnum, identifier: string) {
    return this.userModel.findOne({
      [method]: identifier,
    });
  }

  updateUserById(id: string, data: Partial<IUser>) {
    return this.userModel.updateOne(
      {
        _id: id,
      },
      {
        $set: data,
      },
    );
  }
}
