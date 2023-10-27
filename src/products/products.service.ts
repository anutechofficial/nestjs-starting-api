import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductSchema } from './schemas/schema.product';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel:Model<Product>){}
  async create(createProductDto: CreateProductDto,) {
    const productId=createProductDto.metadata[0];
    const isProductExist=await this.productModel.findOne({ 'metadata.productId': productId});
      
      if (isProductExist){
          throw new BadRequestException('Product with same productId Already Exists!');
        }
          const createdProduct=await this.productModel.create(createProductDto);
          return createdProduct;
      }
  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
