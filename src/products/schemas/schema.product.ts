import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;
@Schema()
export class Product {
  @Prop()
  productName: string;

  @Prop()
  productDescription:string;

  @Prop([
    {
      productId: Number,
      productStripeID: String, // Define productStripeID in the schema
      // Other metadata fields here
    },
  ])
  metadata: Array<{
    productId: number;
    productStripeID: string;
    // Other metadata fields
  }>;

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