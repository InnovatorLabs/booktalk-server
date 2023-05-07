import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './entities/post.entity';
import { PostRequestDto } from './dtos/post.request.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  /**
   * 포스팅 생성
   * @param postRequestDto
   */
  async createPost(postRequestDto: PostRequestDto): Promise<Post> {
    // todo : token 작업
    const postData = {
      // user_id: '645660570b0b3933a9ff0084',
      ...postRequestDto,
    };

    return new this.postModel(postData).save();
  }

  async findMyPosts() {
    return '';
  }
}
