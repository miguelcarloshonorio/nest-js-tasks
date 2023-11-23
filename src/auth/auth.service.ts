import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from './dto/signIn-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(authCredentialsDto: UserLoginDto): Promise<SignInResponseDto> {
    const username = await this.validateUserPassword(authCredentialsDto);
    if (!username) {
      throw new UnauthorizedException('invalid credentials');
    }
    const payload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async signUp(username: string, password: string): Promise<User> {
    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === String(23505)) {
        throw new ConflictException('duplicated username');
      }
      // other errors will throw internal error
      throw new InternalServerErrorException();
    }

    delete user.password;
    delete user.salt;
    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async validateUserPassword(
    authCredentialsDto: UserLoginDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }
}
