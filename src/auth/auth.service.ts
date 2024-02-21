import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from 'src/users/dto/auth-credentials.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersService.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersService.findOne(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
