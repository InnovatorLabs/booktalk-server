import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostRequestDto {
  @ApiProperty({
    example: '제목입니다.',
    description: '포스팅의 제목',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '본문입니다.',
    description: '포스팅의 본문 영역',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example:
      'https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.yes24.com%2FProduct%2FGoods%2F110643617&psig=AOvVaw1mSFYngFPbAaW_tHnCYWvI&ust=1683474121589000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLjp6fmD4f4CFQAAAAAdAAAAABAE',
    description: '책의 이미지입니다.',
  })
  @IsOptional()
  book_image?: string;
}
