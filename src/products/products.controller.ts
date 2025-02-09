import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,
    ) {}

  @ApiOperation({ summary: 'Create Product'})
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
  
  @ApiOperation({ summary: 'Get all Product list'})
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Get by productId'})
  @Get(':productId')
  findOne(@Param('productId') productId: number) {
    const productDetails= this.productsService.findByProductId(productId);
    return productDetails;
  }

  @ApiOperation({ summary: 'Update Product'})
  @Patch(':productId')
  update(@Param('productId') productId: number, @Body() updateProductDto: UpdateProductDto) {
    const updatedProduct=  this.productsService.update(productId, updateProductDto);
    return updatedProduct;
  }

  @ApiOperation({ summary: 'Delete Product'})
  @Delete(':productId')
  remove(@Param('productId') productId: number) {
    return this.productsService.remove(productId);
  }
}
