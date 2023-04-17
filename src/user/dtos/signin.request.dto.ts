import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export const AUTH_TYPE = {
  COMMON: 'COMMON',
  KAKAO: 'KAKAO',
  NAVER: 'NAVER',
  GOOGLE: 'GOOGLE',
} as const;

export type AuthType = (typeof AUTH_TYPE)[keyof typeof AUTH_TYPE];

export class SocialSigninRequestDto {
  @ApiProperty({
    example: 'KAKAO',
    description: '소셜 로그인 종류',
  })
  @IsEnum(AUTH_TYPE, {
    message:
      'authType must be a valid enum values (google, kakao, naver, general)',
  })
  authType: string;

  @ApiProperty({
    example:
      'AAAAOIDxJz_opfuuHc4DsmXJTigwuqCNLORA0_AUy14clrFrplBco_qcZfXCYr_DxA5g8ZFqWJWdkN4-K81TE26nPbY',
    description: '로그인 Token',
  })
  @IsNotEmpty()
  token: string;
}
