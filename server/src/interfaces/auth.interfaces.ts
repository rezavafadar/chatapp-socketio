export enum AuthMethodEnum {
  PHONE = 'phone',
  EMAIL = 'email',
}

export interface SubmitOTPInfo {
  method: AuthMethodEnum;
  identifier: string;
}

export interface VerifyOtpInfo {
  method: AuthMethodEnum;
  identifier: string;
  code: string;
}
