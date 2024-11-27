
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
// marks the class as a Mongoose schema.
export class Services extends Document {
  @Prop()
  product: string;

  @Prop()
  price: number;
  @Prop()
  description: string;
  @Prop({ default: Date.now })
  createdAt: Date;
}

// Create a Mongoose Schema
export const ServicesSchema = SchemaFactory.createForClass(Services);
