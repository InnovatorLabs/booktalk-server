import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GeneralSigninRequestDto,
  SocialSigninRequestDto,
} from './dtos/signin.request.dto';
import { User, UserDocument } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async socialSignin(signinRequestDto: SocialSigninRequestDto): Promise<User> {
    const userInfo = await this.authService.getUserInfo(signinRequestDto);

    const user = await this.findUserByUid(userInfo.uid);
    if (user) {
      return user;
    }
    return this.createAccount(userInfo);
  }

  async generalSignin(
    signinRequestDto: GeneralSigninRequestDto,
  ): Promise<User> {
    return await this.findUserByEmail(signinRequestDto.email);
  }

  async findUserByUid(uid: string): Promise<User> {
    return await this.userModel.findOne({ uid }).exec();
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('This user does not exist.');
    }
    if (user.type !== 'general') {
      throw new BadRequestException('소셜 로그인으로 가입된 이메일입니다.');
    }
    return user;
  }

  createAccount(user: User): Promise<User> {
    const saveAccount = new this.userModel(user);
    return saveAccount.save();
  }
}
