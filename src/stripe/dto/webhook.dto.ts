import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class WebhookDto {



    @ApiProperty()
    endpointSecret:string;
    
    @ApiProperty()
    sig:string;
        
    @ApiProperty()
    body:string;

}
