import { Module } from '@nestjs/common'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { UsersModule } from './users/user.module';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './auth/auth.module';
dotenv.config();

// mongodb://<username>:<password>@<host>:<port>/<database-name>?<options>
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),UsersModule, ServicesModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
