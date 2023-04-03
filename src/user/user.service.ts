import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthType, SigninRequestDto } from './dtos/signin.request.dto';
import { User, UserDocument } from './entities/user.entity';
import { AuthKakaoService } from './social/auth-kakao.service';
import { AuthNaverService } from './social/auth-naver.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authKakaoService: AuthKakaoService,
    private authNaverService: AuthNaverService,
  ) {}

  async oauthKakao(code: string) {
    return this.authKakaoService.oauthKakao(code);
  }

  async signin(signinRequestDto: SigninRequestDto) {
    const userInfo = await this.getUserInfo(signinRequestDto);
    console.log(userInfo);

    const saveAccount = await new this.userModel(userInfo);
    return saveAccount.save();
  }

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
