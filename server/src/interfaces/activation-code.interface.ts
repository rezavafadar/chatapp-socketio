export interface IActivationCode {
  id?: string;
  code: string;
  expireAt: Date;
  identifier: string;
  createdAt?: Date;
}
