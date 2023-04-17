import { forwardRef, Inject, Injectable } from '@nestjs/common';
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

  async socialSignin(signinRequestDto: SocialSigninRequestDto) {
    const userInfo = await this.authService.getUserInfo(signinRequestDto);

    const user = await this.findUserByUid(userInfo.uid);
    if (user) {
      return user;
    }
    return this.createAccount(userInfo);
  }

  async findUserByUid(uid: string) {
    return await this.userModel.findOne({ uid }).exec();
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  createAccount(user: User): Promise<User> {
    const saveAccount = new this.userModel(user);
    return saveAccount.save();
  }
}
