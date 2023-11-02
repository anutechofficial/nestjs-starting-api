import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Length,} from "class-validator";
import { IsPassword } from "./password.decorator";

export class NewPwdDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    otp:number;


    @ApiProperty()
    @IsNotEmpty()
    @Length(8,50)
    @IsPassword({message:'Create Strong Password use Special characters'})
    password:string;
}