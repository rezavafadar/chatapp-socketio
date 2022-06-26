export interface IActivationCode {
  code: string;
  expireAt: Date;
  identifier: string;
  createdAt?: Date;
}
