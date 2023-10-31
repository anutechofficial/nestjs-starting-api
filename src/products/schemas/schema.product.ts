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
  active:boolean;

  @Prop()
  productDescription:string;

  @Prop({type:Date, default:Date.now})
  createdDate:Date;

  @Prop([String])
  productImages:string[];

  @Prop()
  productPriceAmount:number;

  @Prop()
  currency:string;
  
  @Prop()
  stripeProductId:string;

  @Prop()
  stripePriceId:string;
}
export const ProductSchema = SchemaFactory.createForClass(Product);