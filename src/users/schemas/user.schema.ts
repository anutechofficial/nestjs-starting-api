import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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

  @Prop({type:Date, default:Date.now})
  createdDate:Date;

  @Prop()
  userStripeId:string;
}
export const UserSchema = SchemaFactory.createForClass(User);