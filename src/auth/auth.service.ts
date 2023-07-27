import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/db/redis/redis.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private redisService: RedisService,
    private readonly configService: ConfigService,
  ) {}

  async login(user: Partial<User>) {
    const payload = { username: user.username, id: user.id };

    const access_token = this.jwtService.sign(payload);

    await this.redisService.set(
      `token_${user.id}`,
      access_token,
      this.configService.get('JWT_EXPIRES_IN'),
    );

    return {
      access_token,
      type: 'Bearer',
    };
  }
}
