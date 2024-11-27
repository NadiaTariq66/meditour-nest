import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { Services, ServicesSchema } from '../schemas/services/service.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Services.name,      // This should be `Services.name` to register the model correctly
        schema: ServicesSchema    // Correctly referencing the schema
      }
    ])
  ],
  controllers: [ServicesController],
  providers: [ServicesService]
})
export class ServicesModule {}
