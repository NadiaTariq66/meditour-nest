import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcryptjs';
import { User} from "src/schemas/user.schema";
import {LoginDto} from './dto/login.dto';
import { createUserDto } from "./dto/user.dto";

// injectable class ko service bnata hai. yh decorator hai joh code ko  reusable banate hain... kisi or class m is class ko inject kr dena
@Injectable()
export class UsersServices{
    constructor(
        @InjectModel(User.name) private userModel:Model<User>
         
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
  async signup(createUserDto: createUserDto) {
    try {
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
      const savedUser = await newUser.save();

      return { message: 'User created successfully',
        user:savedUser,
 
       }; // Add meaningful response
    } catch (error) {
      console.error('Error in signup:', error.message);
      throw new Error('An error occurred while creating the user');
    }
  }
  
  async login(loginDto: LoginDto) {
    try {
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
  
      return { message: 'Login successful',user }; // Return a success message
    } catch (error) {
      console.error('Error in login:', error.message);
      throw new Error('An error occurred while logging in');
    }
  }
}