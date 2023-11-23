import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { User } from './user.entity';
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/register-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { SignInResponseDto } from './dto/signIn-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'User Login' })
  @ApiOkResponse({ description: 'User log in successfuly', type: User })
  @ApiUnauthorizedResponse({
    description: 'Invalid email or password',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error or missing values (title or description)',
  })
  async signIn(@Body() request: UserLoginDto): Promise<SignInResponseDto> {
    return this.authService.signIn(request);
  }

  @Post('/register')
  @ApiOperation({ summary: 'User Login' })
  @ApiOkResponse({ description: 'User log in successfuly', type: User })
  @ApiUnauthorizedResponse({
    description: 'Invalid email or password',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error or missing values (title or description)',
  })
  async signUp(@Body() request: CreateUserDto): Promise<User> {
    return this.authService.signUp(request.username, request.password);
  }
}
