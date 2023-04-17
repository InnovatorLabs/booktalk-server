import { BadRequestException, Injectable } from '@nestjs/common';
import {
  AUTH_TYPE,
  SocialSigninRequestDto,
} from 'src/user/dtos/signin.request.dto';
import { AuthKakaoService } from './social/auth-kakao.service';
import { AuthNaverService } from './social/auth-naver.service';

@Injectable()
export class AuthService {
  constructor(
    private authKakaoService: AuthKakaoService,
    private authNaverService: AuthNaverService,
  ) {}

  getUserInfo(signinRequestDto: SocialSigninRequestDto) {
    const { authType, token } = signinRequestDto;

    switch (authType) {
      case AUTH_TYPE.KAKAO:
        return this.authKakaoService.getUserInfo(token);
      case AUTH_TYPE.NAVER:
        return this.authNaverService.getUserInfo(token);
      default:
        throw new BadRequestException('The authType is wrong.');
    }
  }
}
