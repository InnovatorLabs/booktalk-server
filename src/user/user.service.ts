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
import { SignupRequestDto } from './dtos/signup.request.dto';
import { checkPassword, hashPassword } from '../common/util';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  /**
   * 소셜 로그인 (카카오, 네이버)
   * @param signinRequestDto
   * @return Promise<User>
   */
  async socialSignin(signinRequestDto: SocialSigninRequestDto): Promise<User> {
    const userInfo = await this.authService.getUserInfo(signinRequestDto);

    const user = await this.findUserByUid(userInfo.uid);
    if (user) {
      return user;
    }

    const saveAccount = new this.userModel(userInfo);
    return saveAccount.save();
  }

  /**
   * 구글 로그인 (리다이렉션 되는 API)
   * @param user
   */
  async loginGoogle(user: User): Promise<User> {
    const userInfo = await this.findUserByUid(user.uid);

    if (userInfo) {
      return userInfo;
    }

    const saveAccount = new this.userModel(userInfo);
    return saveAccount.save();
  }

  /**
   * 일반 로그인
   * @param signinRequestDto
   * @return Promise<User>
   */
  async generalSignin(
    signinRequestDto: GeneralSigninRequestDto,
  ): Promise<User> {
    return await this.findUserByEmail(signinRequestDto);
  }

  /**
   * 유저 검색 (uid)
   * @param uid
   * @return Promise<User>
   */
  async findUserByUid(uid: string): Promise<User> {
    return await this.userModel.findOne({ uid }).exec();
  }

  /**
   * 유저 검색 (이메일)
   * @param signinRequestDto
   * @return Promise<User>
   */
  async findUserByEmail(
    signinRequestDto: GeneralSigninRequestDto,
  ): Promise<User> {
    const user = await this.userModel
      .findOne({
        email: signinRequestDto.email,
      })
      .exec();

    if (!user) {
      throw new NotFoundException('유저 정보가 없습니다.');
    }
    if (user.type !== 'general') {
      throw new BadRequestException('소셜 로그인으로 가입된 이메일입니다.');
    }

    const checkedPassword = await checkPassword(
      signinRequestDto.password,
      user.password,
    );
    if (!checkedPassword) {
      throw new BadRequestException('비밀번호를 잘못 입력하셨습니다.');
    }

    return user;
  }

  /**
   * 계정 생성
   * @param signupRequestDto
   * @return Promise<User>
   */
  async createAccount(signupRequestDto: SignupRequestDto): Promise<void> {
    // todo 예외처리 수정 필요
    try {
      const user = await this.userModel
        .findOne({
          email: signupRequestDto.email,
        })
        .exec();

      if (user) {
        throw new NotFoundException('이미 존재하는 이메일입니다.');
      }

      const hashedPassword = await hashPassword(signupRequestDto.password);

      const account = {
        type: 'GENERAL',
        password: hashedPassword,
        email: signupRequestDto.email,
        nickname: signupRequestDto.nickname,
      };

      const saveAccount = new this.userModel(account);
      await saveAccount.save();
    } catch (error) {
      console.log(error);
    }
  }
}
