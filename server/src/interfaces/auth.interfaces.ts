export enum AuthMethodEnum {
  PHONE = 'phone',
  EMAIL = 'email',
}

export interface SubmitOTPInfo {
  method: AuthMethodEnum;
  identifier: string;
}
