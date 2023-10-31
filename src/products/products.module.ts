import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product , ProductSchema} from './schemas/schema.product';
import { MongooseModule } from '@nestjs/mongoose';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  imports:[MongooseModule.forFeature([{ name: Product.name, schema:ProductSchema}]),StripeModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[ProductsService]
})
export class ProductsModule {}
