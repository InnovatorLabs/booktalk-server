import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthKakaoService } from './social/auth-kakao.service';
import { AuthNaverService } from './social/auth-naver.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthGoogleService } from './social/auth-google.service';
import { GetUser } from './auth.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authKakaoService: AuthKakaoService,
    private authNaverService: AuthNaverService,
    private authGoogleService: AuthGoogleService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  signinGoogle(@Req() req: Request) {
    // redirect to google login page
  }

  @Get('oauthGoogle')
  @UseGuards(AuthGuard('google'))
  oauthGoogle(@GetUser() user: User) {
    return this.authGoogleService.oauthGoogle(user);
  }

  @Get('oauthKakao')
  oauthKakao(@Query('code') code: string) {
    return this.authKakaoService.oauthKakao(code);
  }

  @Get('oauthNaver')
  oauthNaver(@Query('state') state: string, @Query('code') code?: string) {
    return this.authNaverService.oauthNaver(state, code);
  }
}
