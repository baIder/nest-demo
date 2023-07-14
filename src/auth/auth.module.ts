import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/global/strategy/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET') ?? 'secret',
    signOptions: {
      expiresIn: configService.get('JWT_EXPIRES_IN') ?? '10m',
    },
  }),
});

@Module({
  imports: [TypeOrmModule.forFeature([User]), jwtModule],
  controllers: [AuthController],
  providers: [LocalStrategy, AuthService],
  exports: [jwtModule],
})
export class AuthModule {}
