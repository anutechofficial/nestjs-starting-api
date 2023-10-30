import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { type } from 'os';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  username:string;

  @Prop()
  email:string;
  
  @Prop({type:Boolean,default:false})
  isVerified:boolean;

  @Prop()
  password:string;

  @Prop()
  otp:number;
}
export const UserSchema = SchemaFactory.createForClass(User);