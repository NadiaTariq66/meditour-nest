import { Controller, Post, Body } from '@nestjs/common';
import { UsersServices } from '../users/user.services';
import { createUserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login.dto';


@Controller('auth')
export class UsersController {
  constructor(private readonly UsersServices: UsersServices) {}

  // Signup API endpoint
  @Post('signup')
  async signup(@Body() createUserDto: createUserDto) {
    return await this.UsersServices.signup(createUserDto);
  }

  // Login API endpoint
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.UsersServices.login(loginDto);
  }
}