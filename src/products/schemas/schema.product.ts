import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;
@Schema()
export class Product {

  @Prop()
  productId:number;

  @Prop()
  productName: string;

  @Prop()
  productDescription:string;

  @Prop({type:Date, default:Date.now})
  createdDate:Date;

  @Prop([String])
  productImages:string[];

  @Prop()
  productPrice:number;
  
  @Prop()
  stripePriceId:string;

  @Prop()
  stripeProductId:string;
}
export const ProductSchema = SchemaFactory.createForClass(Product);