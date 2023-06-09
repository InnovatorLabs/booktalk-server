import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { catchError, map } from 'rxjs';
import { KakaoUser } from '../dtos/kakao.response.dto';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class AuthKakaoService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  /* 
    kakao 인가코드 받기 테스트 URL
    https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=1953bdb9655fc90f52a9e20a19d820f8&redirect_uri=http://localhost:3000/auth/oauthKakao
  */
  oauthKakao(code: string) {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        grant_type: 'authorization_code',
        client_id: this.config.get('KAKAO_REST_API_KEY'),
        redirect_uri: this.config.get('KAKAO_REDIRECT_URI'),
        code: code,
      },
    };

    return this.httpService
      .post('https://kauth.kakao.com/oauth/token', null, requestConfig)
      .pipe(
        map((response) => {
          return response.data;
        }),
        catchError((error) => {
          throw new UnauthorizedException(error.response.data.msg);
        }),
      );
  }

  async getUserInfo(access_token: string): Promise<User> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${access_token}`,
      },
    };

    const kakaoUser = await this.httpService
      .post<KakaoUser>('https://kapi.kakao.com/v2/user/me', null, requestConfig)
      .pipe(
        map((response) => {
          return response.data;
        }),
        catchError((error) => {
          throw new UnauthorizedException(error.response.data.msg);
        }),
      )
      .toPromise();

    return {
      type: 'kakao',
      uid: kakaoUser.id.toString(),
      nickname: kakaoUser.properties.nickname,
      email: kakaoUser.kakao_account.email ?? null,
      profile_image: kakaoUser.properties.profile_image,
    };
  }
}
