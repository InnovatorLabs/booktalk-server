import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthKakaoService } from './social/auth-kakao.service';
import { AuthNaverService } from './social/auth-naver.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authKakaoService: AuthKakaoService,
    private authNaverService: AuthNaverService,
  ) {}

  @ApiOperation({
    summary: '구글 로그인 페이지 이동',
    description: '구글 로그인 페이지 이동합니다.',
  })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  signinGoogle(@Req() req: Request) {
    // redirect to google login page
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
