import { Module } from "@nestjs/common";
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";
import { AppService } from "src/app.service";


@Module({

    controllers:[ProductController],
    providers:[ProductService,AppService]
})
export class ProductModule{}
