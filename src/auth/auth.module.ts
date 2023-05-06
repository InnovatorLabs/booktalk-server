import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthKakaoService } from './social/auth-kakao.service';
import { AuthNaverService } from './social/auth-naver.service';
import { HttpModule } from '@nestjs/axios';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [HttpModule, forwardRef(() => UserModule)],
  controllers: [AuthController],
  providers: [AuthService, AuthKakaoService, AuthNaverService, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
