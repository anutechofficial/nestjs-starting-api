import { Controller, Get} from "@nestjs/common";
import { AppService } from "src/app.service";
import { ProductService } from "./products.service";

@Controller('Products')
export class ProductController{
    constructor(private readonly appService:AppService, private readonly productService:ProductService){}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('wel')
    getProduct(): string {
        return this.productService.getProduct();
    }

}