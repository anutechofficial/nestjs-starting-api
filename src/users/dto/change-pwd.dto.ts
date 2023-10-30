import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString,} from "class-validator";

export class ChangePwdDto {
    @ApiProperty()
    @IsString()
    username:string;
}