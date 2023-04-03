import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { SigninRequestDto } from './dtos/signin.request.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('signin')
  signin(@Body() signinRequest: SigninRequestDto) {
    return this.userService.signin(signinRequest);
  }
}
