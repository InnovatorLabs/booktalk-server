import { Controller, Get, Param, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthKakaoService } from './social/auth-kakao.service';
import { AuthNaverService } from './social/auth-naver.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private authKakaoService: AuthKakaoService,
    private authNaverService: AuthNaverService,
  ) {}

  @Get('oauthKakao')
  oauthKakao(@Query('code') code: string) {
    return this.authKakaoService.oauthKakao(code);
  }

  @Get('oauthNaver')
  oauthNaver(
    @Query('state') state: string,
    @Query('code') code?: string,
    @Query('error') error?: string,
    @Query('error_description') error_description?: string,
  ) {
    return this.authNaverService.oauthNaver(
      state,
      code,
      error,
      error_description,
    );
  }
}
