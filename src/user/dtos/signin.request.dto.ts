import { IsEnum, IsNotEmpty } from 'class-validator';

export enum AuthType {
  COMMON = 'COMMON',
  KAKAO = 'KAKAO',
  NAVER = 'NAVER',
  GOOGLE = 'GOOGLE',
}

export class SigninRequestDto {
  @IsEnum(AuthType, {
    message:
      'authType must be a valid enum values (google, kakao, naver, common)',
  })
  authType: string;

  @IsNotEmpty()
  token: string;
}
