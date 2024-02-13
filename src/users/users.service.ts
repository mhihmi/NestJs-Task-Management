import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = this.userRepository.create({
      username,
      password,
    });

    await this.userRepository.save(user);
  }

  async getUserById(id: string): Promise<User> {
    const found = await this.userRepository.findOneBy({ id: id });

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not Found`);
    }

    return found;
  }
}
