import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/global/strategy/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

const jwtModule = JwtModule.register({
  secret: 'test123456',
  signOptions: { expiresIn: '4h' },
});

@Module({
  imports: [TypeOrmModule.forFeature([User]), jwtModule],
  controllers: [AuthController],
  providers: [LocalStrategy, AuthService],
  exports: [jwtModule],
})
export class AuthModule {}
