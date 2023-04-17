import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map, pluck } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { NaverUser } from '../dtos/naver.response.dto';

@Injectable()
export class AuthNaverService {
  constructor(
    private httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  /* 
    naver 로그인 인증 요청 테스트 URL
    https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=8uX_S5lQXAh7ySGV5cO0&state=STATE_STRING&redirect_uri=http://127.0.0.1:3000/auth/oauthNaver
  */
  oauthNaver(state: string, code?: string) {
    const params = {
      grant_type: 'authorization_code',
      client_id: this.config.get('NAVER_CLIENT_ID'),
      client_secret: this.config.get('NAVER_CLIENT_SECRET_CODE'),
      code,
      state,
    };

    return this.httpService
      .get('https://nid.naver.com/oauth2.0/token', {
        params,
      })
      .pipe(
        map((response) => {
          return response.data;
        }),
        catchError((error) => {
          throw new UnauthorizedException(error.response.data.message);
        }),
      );
  }

  async getUserInfo(access_token: string): Promise<User> {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    const naverUser = await this.httpService
      .get<NaverUser>('https://openapi.naver.com/v1/nid/me', {
        headers,
      })
      .pipe(
        map((response) => {
          return response.data;
        }),
        catchError((error) => {
          throw new UnauthorizedException(error.response.data.message);
        }),
      )
      .toPromise();

    return {
      type: 'naver',
      uid: naverUser.response.id,
      nickname: naverUser.response.nickname,
      email: naverUser.response.email ?? null,
      profile_image: naverUser.response.profile_image,
    };
  }
}
