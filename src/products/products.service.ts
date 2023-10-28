import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/schema.product';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel:Model<Product>){}
  async create(createProductDto: CreateProductDto,) {
    try{
    const productId=createProductDto.productId;
    const isProductExist=await this.productModel.findOne({productId});
      
      if (isProductExist){
          throw new BadRequestException('Product with same productId Already Exists!');
        }
          const createdProduct=await this.productModel.create(createProductDto);
          return `Created Product Details: ${createdProduct}`;
      }
      catch{
        return `Somthing went Wrong!`
      }
    }
  async findAll() {
    try{ 
      const products= await this.productModel.find();
      return products;
    }
    catch{
      return `Somthing went Wrong!`
    }
  }

  async findOne(productId: number) {
    try{
      const product=await this.productModel.findOne({productId});
      if(product){
        return `Product Found ${product}`
      }
       return `No product with this id: ${productId}`;
      }
     catch{
      return "Product not found!";
    }
    
  }

  async update(productId: number, updateProductDto: UpdateProductDto) {
    try{
      const updatedProduct= await this.productModel.findOneAndUpdate({productId},updateProductDto);
      if(updatedProduct){
        return `Updated Product ${updatedProduct}`;
      }
      else{
        return `No Product with id: ${productId}`
      }
    }catch{
      return `Somthing went wrong!`
    } 
  }

  async remove(productId: number) {
    try{
      const deletedProduct=await this.productModel.findOneAndDelete({productId});
      if(deletedProduct){
        return deletedProduct;
      }
      else{
        return `No Product with id :${productId}`;
      }
    }
    catch{
      return `Somthing went wrong!`;
    }
   
  }
}
