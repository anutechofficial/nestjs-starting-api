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
     @IsObject({ each: true }) // Validate each metadata object
     metadata: Array<{
    productId: number;
    productStripeID: string; // Add productStripeID
    // Other metadata fields
      }>;

    
    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    productImages:string[];

    @ApiProperty()
    @IsNumber()    
    @IsNotEmpty()
    productPrice:number;
}
