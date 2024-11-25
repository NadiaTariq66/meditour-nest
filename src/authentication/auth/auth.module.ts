import { Module } from '@nestjs/common';
import { UsersModule } from '../../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.services';
import { AuthController } from './auth.controller';
import { Strategy as JwtStrategy } from 'passport-jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,  // Replace with a secure secret
      signOptions: { expiresIn: '60m' },  // Token expiration time
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
