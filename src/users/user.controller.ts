import { Controller, Post, Body } from '@nestjs/common';
import { UsersServices } from '../users/user.services';
import { createUserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly UsersServices: UsersServices) {}
  @Post('signup')
  async signup(@Body() createUserDto: createUserDto) {
    try {
      const result = await this.UsersServices.signup(createUserDto);
      return {
        statusCode: 201,
        message: result.message,
        data: result.user,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: error.message || 'An error occurred during signup',
      };
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.UsersServices.login(loginDto);
      return {
        statusCode: 200,
        message: result.message,
        data: result.user, // Include user data in the response
      };
    } catch (error) {
      return {
        statusCode: 401,
        message: error.message || 'Invalid credentials',
      };
    }
  }
}
