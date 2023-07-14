import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import type { IStrategyOptions } from 'passport-local';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compareSync } from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(key1: string, key2: string): Promise<any> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username=:username', { username: key1 })
      .getOne();

    if (!user) throw new BadRequestException('用户不存在');

    if (!compareSync(key2, user.password))
      throw new BadRequestException('密码错误');

    return user;
  }
}
