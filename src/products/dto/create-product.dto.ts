import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString, Length } from "class-validator";

export class CreateProductDto {

    @ApiProperty()
    @Length(8,250)
    @IsNotEmpty()
    @IsString()
    productName:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    productDescription:string;

    @ApiProperty()
    @IsString() // Validate each metadata object
    metadata: string[];

    
    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    productImages:string[];

    @ApiProperty()
    @IsNumber()    
    @IsNotEmpty()
    productPrice:number;
}
