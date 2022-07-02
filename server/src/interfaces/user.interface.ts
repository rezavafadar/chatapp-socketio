export interface IUser {
  id?: string;
  phone?: string;
  email?: string;
  active?: boolean;
  blocked?: boolean;
  userProfile?: IUserProfile;
}

export interface IUserProfile {
  picture: string;
  username: string;
  bio: string;
  fullname: string;
}
