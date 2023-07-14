import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: Partial<User>) {
    const payload = { username: user.username, id: user.id };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      type: 'Bearer',
    };
  }
}
