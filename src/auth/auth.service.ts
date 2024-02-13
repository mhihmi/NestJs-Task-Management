import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from 'src/users/dto/auth-credentials.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersService.createUser(authCredentialsDto);
  }
}
