import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;
@Schema()
export class Product {
  @Prop()
  productName: string;

  @Prop()
  productDescription:string;

  @Prop([String])
  metadata:string[];

  @Prop({type:Date, default:Date.now})
  createdDate:Date;

  @Prop([String])
  productImages:string[];
  
  @Prop()
  productPriceId:string;

  @Prop()
  productStripeId:string;
}
export const ProductSchema = SchemaFactory.createForClass(Product);