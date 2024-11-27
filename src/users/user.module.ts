
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Module } from '@nestjs/common';
import { UsersServices } from './user.services';
import { UsersController } from './user.controller';


@ Module({
    imports:[
    MongooseModule.forFeature([
        {
            name:User.name,
            schema:UserSchema

        }
    ]),
    ],
    controllers: [UsersController],
    providers: [UsersServices],
    
})
export class UsersModule {}