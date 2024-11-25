import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersServices } from '../users/user.services';
// import { JwtPayload } from './JwtPayload';
import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';

@Injectable()
export class JwtAuthStrategy  extends PassportStrategy(JwtStrategy) {
  constructor(private usersServices: UsersServices) {
    super({
      jwtFromRequest: (req) => req.cookies['access_token'], // Optionally use cookies
      ignoreExpiration: false,
      secretOrKey: 'your_jwt_secret', // Use the same secret you used when signing the JWT
    });
  }

  async validate(payload: JwtPayload) {
    const userId = payload.sub; // 'sub' will be the user._id from the JWT token
    const user = await this.usersServices.findById(userId); // Use the ID to find the user

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}