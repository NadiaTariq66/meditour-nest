import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.services';
import { LoginDto } from '../../dto/login.dto';

@Controller('auth') // Base route: /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') // Endpoint: POST /auth/login
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('signup') // Endpoint: POST /auth/signup
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
}
