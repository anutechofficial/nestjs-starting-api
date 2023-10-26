import { ApiProperty } from "@nestjs/swagger";

export class signInDto{

    @ApiProperty()
    username :string;

    @ApiProperty()
    password:string;
    
}