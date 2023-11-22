import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({ description: 'Username', type: String })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'password', type: String })
  @IsNotEmpty()
  @IsString()
  password: string;
}
