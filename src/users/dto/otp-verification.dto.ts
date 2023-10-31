import { ApiProperty } from "@nestjs/swagger";
import { IsNumber,} from "class-validator";

export class OtpDto {
    @ApiProperty()
    @IsNumber()
    otp:number
}