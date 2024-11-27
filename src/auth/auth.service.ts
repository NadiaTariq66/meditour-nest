
import { Injectable } from '@nestjs/common';
import { UsersServices } from '../users/user.services';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersServices) {}

  async validateUser(name: string, password: string, email:string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
