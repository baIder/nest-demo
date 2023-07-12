import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    return await this.user.save(user);
  }

  async findAll(query: { page: number; size: number }) {
    const { page = 1, size = 5 } = query;
    const [users, total] = await this.user.findAndCount({
      skip: (page - 1) * size,
      take: size,
    });
    return { users, total };
  }

  async findOne(id: number) {
    return await this.user.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.user.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.user.delete(id);
  }
}
