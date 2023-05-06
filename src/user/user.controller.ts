import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  GeneralSigninRequestDto,
  SocialSigninRequestDto,
} from './dtos/signin.request.dto';
import { UserService } from './user.service';
import { SignupRequestDto } from './dtos/signup.request.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/auth.decorator';
import { User } from './entities/user.entity';

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

  @ApiExcludeEndpoint()
  @Get('login/google')
  @UseGuards(AuthGuard('google'))
  oauthGoogle(@GetUser() user: User) {
    return this.userService.loginGoogle(user);
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

  @ApiOperation({
    summary: '회원가입',
    description: '회원가입합니다.',
  })
  @ApiBody({ type: SignupRequestDto })
  @Post('signup')
  createAccount(@Body() signupRequestDto: SignupRequestDto) {
    return this.userService.createAccount(signupRequestDto);
  }
}
