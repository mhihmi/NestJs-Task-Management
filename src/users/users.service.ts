import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //   async getUserById(id: string): Promise<User> {
  //     const found = await this.userRepository.findOneBy({ id: id });

  //     if (!found) {
  //       throw new NotFoundException(`Task with ID "${id}" not Found`);
  //     }

  //     return found;
  //   }
}
