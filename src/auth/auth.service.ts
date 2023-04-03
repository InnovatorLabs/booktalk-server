import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthType, SigninRequestDto } from 'src/user/dtos/signin.request.dto';
import { AuthKakaoService } from './social/auth-kakao.service';
import { AuthNaverService } from './social/auth-naver.service';

@Injectable()
export class AuthService {
  constructor(
    private authKakaoService: AuthKakaoService,
    private authNaverService: AuthNaverService,
  ) {}

  getUserInfo(signinRequestDto: SigninRequestDto) {
    const { authType, token } = signinRequestDto;

    switch (authType) {
      case AuthType.KAKAO:
        return this.authKakaoService.getUserInfo(token);
      case AuthType.NAVER:
        return this.authNaverService.getUserInfo(token);
      //   case AuthType.Google:
      //     return this.authAppleService.getCertified(token);
      default:
        throw new BadRequestException('The authType is wrong.');
    }
  }
}
