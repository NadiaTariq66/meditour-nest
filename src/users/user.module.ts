
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Module } from '@nestjs/common';
import { UsersServices } from './user.services';
import { JwtAuthModule } from 'src/authentication/jwt.services';

@ Module({
    imports:[
    MongooseModule.forFeature([
        {
            name:User.name,
            schema:UserSchema


        }
    ]),
    JwtAuthModule,
    ],
    controllers: [],
    providers: [UsersServices],
    
})
export class UsersModule {}