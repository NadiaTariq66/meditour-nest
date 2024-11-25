import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersServices } from '../../users/user.services';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersServices,
    private jwtService: JwtService,
  ) {}

 // Validate user during login (still uses email and password for login endpoint)
 async validateUser(email: string, password: string): Promise<any> {
  const user = await this.usersService.findByEmail(email); // Use email for login
  if (user) {
    const isPasswordValid = await this.usersService.validatePassword(password, user.password); // Add helper for password validation
    if (isPasswordValid) {
      const { password, ...result } = user.toObject();
      return result;
    }
  }
  return null;
}

// Login method: generate a token using user ID
async login(user: User) {
  const payload = { email: user.email, sub: user._id }; // 'sub' is user._id
  return {
    access_token: this.jwtService.sign(payload),
  };
}

// A helper to validate JWT and retrieve user by ID
async validateJwtToken(userId: string): Promise<User | null> {
  return await this.usersService.findById(userId); // Find user by ID (from JWT `sub`)
}
}