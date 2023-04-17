import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGoogleService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async oauthGoogle(user: User): Promise<User> {
    const userInfo = await this.userService.findUserByUid(user.uid);

    if (userInfo) {
      return userInfo;
    }
    return this.userService.createAccount(user);
  }
}
