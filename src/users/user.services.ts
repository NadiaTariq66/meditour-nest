import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { create } from "domain";
import { Model } from "mongoose";
import * as bcrypt from 'bcryptjs';
import { User} from "src/schemas/user.schema";

import { JwtService } from '@nestjs/jwt';
import {LoginDto} from '../dto/login.dto';
import { createUserDto } from "../dto/user.dto";

// injectable class ko service bnata hai. yh decorator hai joh code ko  reusable banate hain... kisi or class m is class ko inject kr dena
@Injectable()
export class UsersServices{
    constructor(
        @InjectModel(User.name) private userModel:Model<User>,
        // inject user model in to service
         private jwtService: JwtService, 
         
    ){}
    //Find user by email (existing function)
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword); // Compare plain-text password with hashed
  }


  // Find user by _id (for JWT token validation)
  async findById(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).exec();
  }

    // Signup function
  async signup(createUserDto: createUserDto) {
    const { email, password, name } = createUserDto;
    
    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password before saving to DB
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
    name,
      email,
      password: hashedPassword,
    });

    // Save user to DB
    await newUser.save();
    return this.generateJwt(newUser);  // Generate JWT token after signup
  }

  // Login function
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Return JWT token
    return this.generateJwt(user);
  }

  // Function to generate JWT token
  private generateJwt(user: User) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
// async create(createUserDto: any): Promise<User> {
//     const createdUser = new this.userModel(createUserDto);
//     return createdUser.save();
//   }
