import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthType, SigninRequestDto } from './dtos/signin.request.dto';
import { User, UserDocument } from './entities/user.entity';
import { AuthKakaoService } from '../auth/social/auth-kakao.service';
import { AuthNaverService } from '../auth/social/auth-naver.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async signin(signinRequestDto: SigninRequestDto) {
    const userInfo = await this.authService.getUserInfo(signinRequestDto);
    console.log(userInfo);

    const saveAccount = await new this.userModel(userInfo);
    return saveAccount.save();
  }
}
