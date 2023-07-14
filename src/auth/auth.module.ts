import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/global/strategy/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [LocalStrategy],
})
export class AuthModule {}
