import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { PostRequestDto } from './dtos/post.request.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({
    summary: '포스팅 하기',
    description: '포스팅 API',
  })
  @ApiBody({ type: PostRequestDto })
  @Post()
  createPost(@Body() postRequestDto: PostRequestDto) {
    return this.postService.createPost(postRequestDto);
  }

  // @ApiOperation({
  //   summary: '내 책장 리스트 검색',
  //   description: '내 책장 리스트 검색 API',
  // })
  // @ApiBody({ type:  })
  // @Post('')
  // findMyPosts() {
  //   return this.postService.findMyPosts();
  // }
}
