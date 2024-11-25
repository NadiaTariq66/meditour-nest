
// import { isEmpty,isEmail } from 'class-validator';
import { IsString,isEmail,isEmpty } from 'class-validator/esm2015/decorator/typechecker/IsString';
export class createUserDto {
  
@IsString()
  name: string;
@isEmail()
  email: string;

  gender: string;
@isEmpty()
  password: string;
}
