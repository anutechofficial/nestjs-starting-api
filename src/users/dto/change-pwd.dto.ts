import { ApiProperty } from "@nestjs/swagger";
import { IsString,} from "class-validator";

export class ChangePwdDto {
    @ApiProperty()
    @IsString()
    username:string;
}