import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignupRequestDto {
  @ApiProperty({
    example: 'zsunkk@gmail.com',
    description: '이메일 주소',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'qlalfqjsgh486',
    description: '회원가입 비밀번호',
  })
  @IsNotEmpty()
  password?: string;

  @ApiProperty({
    example: 'ashe',
    description: '닉네임',
  })
  @IsNotEmpty()
  nickname: string;
}
