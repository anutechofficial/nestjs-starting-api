import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class IntentDto {



    @ApiProperty()
    amount:number;
    
    @ApiProperty()
    currency:string;
        
    // @ApiProperty()
    // body:string;

}
