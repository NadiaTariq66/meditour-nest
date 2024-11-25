import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


// // import * as mongoose from 'mongoose';
// import { Owner } from '../owners/schemas/owner.schema';

// // inside the class definition
// @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
// owner: Owner;

@Schema()
// marks the class as a Mongoose schema.
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;
  @Prop()
  gender: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

// Create a Mongoose Schema
export const UserSchema = SchemaFactory.createForClass(User);
