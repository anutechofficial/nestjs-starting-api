import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateProductDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    productId:number;

    @ApiProperty()
    @Length(8,250)
    @IsNotEmpty()
    @IsString()
    productName:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    active:boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(8,500)
    productDescription:string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    productImages:string[];

    @ApiProperty()
    @IsNumber()    
    @IsNotEmpty()
    productPriceAmount:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    currency:string;

    stripeProductId:string;
    stripePriceId:string;
}
