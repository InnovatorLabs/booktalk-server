import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  GeneralSigninRequestDto,
  SocialSigninRequestDto,
} from './dtos/signin.request.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '소셜 로그인 (kakao, naver)',
    description: '소셜 로그인으로 로그인합니다.',
  })
  @ApiBody({ type: SocialSigninRequestDto })
  @Post('signin/social')
  socialSignin(@Body() signinRequest: SocialSigninRequestDto) {
    return this.userService.socialSignin(signinRequest);
  }

  @ApiOperation({
    summary: '일반 로그인',
    description: '일반 로그인으로 로그인합니다.',
  })
  @ApiBody({ type: GeneralSigninRequestDto })
  @Post('signin/general')
  generalSignin(@Body() signinRequest: GeneralSigninRequestDto) {
    return this.userService.generalSignin(signinRequest);
  }
}
