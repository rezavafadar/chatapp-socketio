import mongoose from 'mongoose';

import type { IUser } from '../interfaces/user.interface';

const userSchema = new mongoose.Schema<IUser>({
  phone: { type: String, required: false, unique: true },
  email: { type: String, required: false, unique: true },
  active: { type: Boolean, default: false },
  blocked: { type: Boolean, default: false },
  userProfile: {
    required: false,
    picture: { type: String, required: false },
    bio: { type: String, required: false },
    fullname: { type: String, required: false },
    username: { type: String, required: false },
  },
});

export const UserModel = mongoose.model<IUser>('user', userSchema);
